# AI File Cleansing & Analysis Tool

An AI-powered solution for security consultants to automatically cleanse, standardize, and analyze diverse client files. This tool removes PII (Personally Identifiable Information), extracts text from various file formats, and analyzes content for security-related insights.

## Features

### 1. File Cleansing Workflow
- **PII Detection & Masking**: Automatically detects and masks:
  - Email addresses
  - Phone numbers
  - Social Security Numbers (SSN)
  - Credit card numbers
  - Names
  - Addresses
- **Client Information Removal**: Removes or masks sensitive client information
- **Traceability Prevention**: Ensures files cannot be traced back to clients

### 2. File Analysis Workflow
- **Multi-Format Support**: Processes various file formats:
  - PDF files (`.pdf`)
  - Excel spreadsheets (`.xlsx`, `.xls`)
  - Word documents (`.docx`)
  - PowerPoint presentations (`.pptx`)
  - Images (`.jpg`, `.jpeg`, `.png`)
  - Text files (`.txt`)
- **Text Extraction**: 
  - OCR for images and scanned documents
  - Parsing for structured documents
  - Table extraction from spreadsheets
- **Content Interpretation**: Identifies key security elements:
  - IAM policy statements
  - Firewall rule entries
  - IDS/IPS log snippets
  - Authentication configurations
  - Encryption settings
- **Analysis & Insights**: Generates meaningful insights for security consultants

### 3. Complete Processing
- Combined workflow that cleanses PII and analyzes content in one step
- Standardized output format for easy review

## Technology Stack

### Frontend
- **React**: Modern UI framework
- **JavaScript**: Core programming language
- **Axios**: HTTP client for API requests
- **CSS3**: Custom styling with gradients and animations

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **Multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **xlsx**: Excel file processing
- **mammoth**: Word document processing
- **tesseract.js**: OCR for image text extraction
- **sharp**: Image processing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/LakshyaJain08/ai-test2.git
cd ai-test2
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

## Running the Application

### Option 1: Development Mode (Separate Terminals)

1. **Start the backend server**
```bash
cd server
npm start
```
The server will run on http://localhost:5000

2. **Start the React frontend** (in a new terminal)
```bash
cd client
npm start
```
The application will open in your browser at http://localhost:3000

### Option 2: Production Build

1. **Build the React app**
```bash
cd client
npm run build
```

2. **Serve the production build**
You can serve the build folder using any static file server or integrate it with the Express backend.

## Usage

### 1. Select Processing Mode

The application offers three modes:

- **File Cleansing**: Focus on removing/masking PII and sensitive information
- **File Analysis**: Focus on text extraction and content analysis
- **Complete Processing**: Both cleansing and analysis in one step

### 2. Upload a File

- Drag and drop a file into the upload zone, or
- Click the upload zone to browse and select a file

Supported formats:
- PDF (`.pdf`)
- Excel (`.xlsx`, `.xls`)
- Word (`.docx`)
- PowerPoint (`.pptx`)
- Images (`.jpg`, `.jpeg`, `.png`)
- Text (`.txt`)

Maximum file size: 50MB

### 3. Process the File

Click the process button to start:
- **Cleanse File** (in Cleansing mode)
- **Analyze File** (in Analysis mode)
- **Process File** (in Complete Processing mode)

### 4. Review Results

The application will display:

**For Cleansing:**
- List of detected PII types
- Number of occurrences for each type
- Cleansed text output with PII masked

**For Analysis:**
- Word and character counts
- Security-related content detection
- Identified security elements (IAM, firewalls, IDS/IPS, etc.)
- Generated insights
- Extracted text preview

**For Complete Processing:**
- All of the above combined

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the API status.

### File Cleansing
```
POST /api/cleanse
```
Upload a file for PII detection and cleansing.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (the file to process)

**Response:**
```json
{
  "success": true,
  "originalFileName": "document.pdf",
  "detectedPII": [...],
  "cleansedText": "...",
  "textLength": 12345
}
```

### File Analysis
```
POST /api/analyze
```
Upload a file for text extraction and analysis.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (the file to process)

**Response:**
```json
{
  "success": true,
  "originalFileName": "document.pdf",
  "fileType": ".pdf",
  "analysis": {...},
  "piiDetected": [...],
  "extractedTextPreview": "..."
}
```

### Complete Processing
```
POST /api/process
```
Upload a file for both cleansing and analysis.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (the file to process)

**Response:**
```json
{
  "success": true,
  "originalFileName": "document.pdf",
  "fileType": ".pdf",
  "cleansing": {...},
  "analysis": {...}
}
```

## Architecture

### Frontend (React)
```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── FileUpload.js      # File upload component
│   │   ├── FileUpload.css
│   │   ├── Results.js          # Results display component
│   │   └── Results.css
│   ├── App.js                  # Main application component
│   ├── App.css
│   └── index.js                # Application entry point
└── package.json
```

### Backend (Node.js/Express)
```
server/
├── index.js                    # Main server file
├── uploads/                    # Temporary file storage (auto-created)
└── package.json
```

## Security Considerations

- Files are temporarily stored and immediately deleted after processing
- PII patterns are comprehensively detected using regex patterns
- No data is persisted to disk permanently
- CORS is enabled for cross-origin requests
- File size limits prevent DoS attacks
- File type validation prevents malicious uploads

## Future Enhancements

- [ ] Support for more file formats (CSV, JSON, XML)
- [ ] Advanced OCR with multiple language support
- [ ] Machine learning-based PII detection
- [ ] Client logo detection and removal using image processing
- [ ] Batch file processing
- [ ] Export cleansed files in various formats
- [ ] User authentication and session management
- [ ] Cloud storage integration
- [ ] Real-time processing status updates
- [ ] Audit logs and compliance reporting

## Troubleshooting

### Common Issues

**1. Port Already in Use**
If port 5000 or 3000 is already in use, you can change the port:
- Backend: Set `PORT` environment variable
- Frontend: Use a different port when prompted

**2. File Upload Fails**
- Check file size (max 50MB)
- Verify file format is supported
- Ensure server is running

**3. OCR Not Working**
- Tesseract.js requires internet connection for first run
- Image files should have clear, readable text

**4. CORS Errors**
- Ensure backend URL is correctly configured
- Check CORS settings in server/index.js

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

## Acknowledgments

- Tesseract.js for OCR capabilities
- pdf-parse for PDF processing
- xlsx for Excel file handling
- mammoth for Word document processing
- All other open-source libraries used in this project
