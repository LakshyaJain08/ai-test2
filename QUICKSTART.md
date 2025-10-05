# Quick Start Guide

## Overview
This is an AI-powered file cleansing and analysis tool built with React and Node.js, designed for security consultants to process client files while removing sensitive information.

## Prerequisites
- Node.js v14+ and npm v6+
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### One-Command Setup (Recommended)
```bash
# Install all dependencies
npm run install-all
```

### Manual Setup
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

## Running the Application

### Development Mode

**Option 1: Run Both Servers Separately**

1. Start the backend server (Terminal 1):
```bash
cd server
npm start
```
Server will run on http://localhost:5000

2. Start the React frontend (Terminal 2):
```bash
cd client
npm start
```
Application will open at http://localhost:3000

**Option 2: Using Concurrently (if installed)**
```bash
npm run dev
```

### Production Mode

1. Build the React app:
```bash
cd client
npm run build
```

2. Serve the production build with your preferred static server or integrate with the Express backend.

## Usage Guide

### 1. Select Processing Mode

Choose from three modes:
- **File Cleansing**: Remove PII and sensitive information
- **File Analysis**: Extract and analyze text content
- **Complete Processing**: Both cleansing and analysis

### 2. Upload a File

- Drag and drop a file into the upload zone, OR
- Click the upload zone to browse files

**Supported Formats:**
- PDF (`.pdf`)
- Excel (`.xlsx`, `.xls`)
- Word (`.docx`)
- PowerPoint (`.pptx`)
- Images (`.jpg`, `.jpeg`, `.png`)
- Text (`.txt`)

**File Size Limit:** 50MB

### 3. Process the File

Click the appropriate button:
- "Cleanse File" (in Cleansing mode)
- "Analyze File" (in Analysis mode)
- "Process File" (in Complete Processing mode)

### 4. Review Results

**Cleansing Results:**
- List of detected PII types
- Number of occurrences
- Cleansed text output with redactions

**Analysis Results:**
- Word and character counts
- Security content detection
- Identified security elements (IAM, firewalls, IDS/IPS, etc.)
- Generated insights
- Extracted text preview

## Testing the Application

### Test with Sample File

Create a test file with sample data:

```bash
cat > test.txt << EOF
Security Report

Contact: john.doe@example.com
Phone: 555-123-4567
SSN: 123-45-6789

IAM Policy Configuration:
- Access control implemented
- Role-based authentication configured

Firewall Rules:
- Port 443 open for HTTPS
- Network segmentation active
EOF
```

Upload this file to see the PII detection and security analysis in action.

## API Testing

Test the backend API directly using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Test cleansing
curl -X POST http://localhost:5000/api/cleanse \
  -F "file=@test.txt"

# Test analysis
curl -X POST http://localhost:5000/api/analyze \
  -F "file=@test.txt"

# Test complete processing
curl -X POST http://localhost:5000/api/process \
  -F "file=@test.txt"
```

## Project Structure

```
ai-test2/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Main styles
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   ├── uploads/          # Temporary file storage (auto-created)
│   └── package.json
├── README.md             # Full documentation
├── QUICKSTART.md         # This file
└── package.json          # Root package.json
```

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend:**
```bash
PORT=5001 npm start
```

**Frontend:**
Update the API URL in `client/src/components/FileUpload.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001';
```

### File Upload Fails
- Check file size (max 50MB)
- Verify file format is supported
- Ensure backend server is running

### CORS Errors
- Verify both servers are running
- Check that API_BASE_URL is correct in FileUpload.js

### OCR Not Working
- Tesseract.js downloads language data on first run
- Ensure internet connection is available
- Images should have clear, readable text

## Security Notes

- Files are temporarily stored and immediately deleted after processing
- No data is persisted permanently
- PII is masked, not stored
- All processing happens server-side

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize PII patterns for your needs
- Integrate with your existing security workflows

## Support

For issues or questions, please refer to:
- Full documentation in [README.md](README.md)
- GitHub repository issues
- API documentation in the main README

## License

This project is licensed under the GNU Affero General Public License v3.0 - see [LICENSE](LICENSE) for details.
