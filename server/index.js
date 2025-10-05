const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// PII detection patterns
const PII_PATTERNS = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /\b(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  name: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
  address: /\b\d+\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)*\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b/gi
};

// Function to detect and mask PII
function maskPII(text) {
  let cleansedText = text;
  const detectedPII = [];

  Object.entries(PII_PATTERNS).forEach(([type, pattern]) => {
    const matches = text.match(pattern);
    if (matches) {
      detectedPII.push({ type, count: matches.length, examples: matches.slice(0, 2) });
      matches.forEach(match => {
        const masked = '[REDACTED ' + type.toUpperCase() + ']';
        cleansedText = cleansedText.replace(match, masked);
      });
    }
  });

  return { cleansedText, detectedPII };
}

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

// Extract text from Excel
async function extractTextFromExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  let text = '';
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    text += `\n--- Sheet: ${sheetName} ---\n`;
    text += xlsx.utils.sheet_to_txt(sheet);
  });
  
  return text;
}

// Extract text from Word document
async function extractTextFromWord(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

// Extract text from images using OCR
async function extractTextFromImage(filePath) {
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
  return text;
}

// Process PowerPoint (basic extraction)
async function extractTextFromPPTX(filePath) {
  // For PPTX, we'll use mammoth as a basic approach
  // In production, you'd use a more specialized library
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "PowerPoint content extraction limited. Please use specialized tools for full extraction.";
  } catch (error) {
    return "PowerPoint content extraction limited. Text content: [slides detected]";
  }
}

// Main file processing function
async function processFile(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();
  let extractedText = '';

  try {
    switch (ext) {
      case '.pdf':
        extractedText = await extractTextFromPDF(filePath);
        break;
      case '.xlsx':
      case '.xls':
        extractedText = await extractTextFromExcel(filePath);
        break;
      case '.docx':
        extractedText = await extractTextFromWord(filePath);
        break;
      case '.jpg':
      case '.jpeg':
      case '.png':
        extractedText = await extractTextFromImage(filePath);
        break;
      case '.pptx':
        extractedText = await extractTextFromPPTX(filePath);
        break;
      case '.txt':
        extractedText = await fs.readFile(filePath, 'utf-8');
        break;
      default:
        throw new Error('Unsupported file format');
    }

    return extractedText;
  } catch (error) {
    throw new Error(`Failed to process file: ${error.message}`);
  }
}

// Analyze content for security-related information
function analyzeContent(text) {
  const analysis = {
    wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
    characterCount: text.length,
    containsSecurityKeywords: false,
    securityElements: [],
    insights: []
  };

  // Security-related keywords
  const securityKeywords = {
    'IAM Policy': /iam|policy|permission|role|access control/gi,
    'Firewall Rules': /firewall|port|protocol|ip address|network rule/gi,
    'IDS/IPS': /intrusion detection|intrusion prevention|ids|ips|alert|threat/gi,
    'Authentication': /authentication|oauth|saml|sso|password|credential/gi,
    'Encryption': /encryption|decrypt|cipher|ssl|tls|certificate/gi
  };

  Object.entries(securityKeywords).forEach(([category, pattern]) => {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      analysis.containsSecurityKeywords = true;
      analysis.securityElements.push({
        category,
        count: matches.length
      });
    }
  });

  // Generate insights
  if (analysis.containsSecurityKeywords) {
    analysis.insights.push('Document contains security-related configuration or policy information');
  }
  
  if (analysis.wordCount > 500) {
    analysis.insights.push('This is a detailed document requiring thorough review');
  }

  return analysis;
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI File Cleansing API is running' });
});

// File upload and cleansing endpoint
app.post('/api/cleanse', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Extract text from file
    const extractedText = await processFile(filePath, originalName);

    // Cleanse the text (remove PII)
    const { cleansedText, detectedPII } = maskPII(extractedText);

    // Clean up uploaded file
    await fs.unlink(filePath);

    res.json({
      success: true,
      originalFileName: originalName,
      detectedPII,
      cleansedText: cleansedText.substring(0, 5000), // Limit response size
      textLength: cleansedText.length
    });

  } catch (error) {
    console.error('Cleansing error:', error);
    res.status(500).json({ error: error.message });
  }
});

// File analysis endpoint
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Extract text from file
    const extractedText = await processFile(filePath, originalName);

    // Analyze the content
    const analysis = analyzeContent(extractedText);

    // Also cleanse for PII
    const { detectedPII } = maskPII(extractedText);

    // Clean up uploaded file
    await fs.unlink(filePath);

    res.json({
      success: true,
      originalFileName: originalName,
      fileType: path.extname(originalName),
      analysis,
      piiDetected: detectedPII,
      extractedTextPreview: extractedText.substring(0, 500)
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Combined cleanse and analyze endpoint
app.post('/api/process', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Extract text from file
    const extractedText = await processFile(filePath, originalName);

    // Cleanse the text
    const { cleansedText, detectedPII } = maskPII(extractedText);

    // Analyze the content
    const analysis = analyzeContent(cleansedText);

    // Clean up uploaded file
    await fs.unlink(filePath);

    res.json({
      success: true,
      originalFileName: originalName,
      fileType: path.extname(originalName),
      cleansing: {
        detectedPII,
        cleansedText: cleansedText.substring(0, 5000),
        totalLength: cleansedText.length
      },
      analysis
    });

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
