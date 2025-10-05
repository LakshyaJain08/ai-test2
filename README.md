# 🔒 File Processing & Analysis System

An AI-powered React application for automating file cleansing and security analysis workflows for Security Consultants.

## 📋 Overview

This application addresses the cyber simulation exercise requirements by providing automated solutions for:

1. **File Cleansing**: Removing or masking client logos, names, and Personally Identifiable Information (PII)
2. **File Analysis**: Extracting text, interpreting content, and generating security insights from diverse file formats

## ✨ Features

### File Cleansing Workflow
- Upload multiple files (PDFs, images, spreadsheets, presentations, etc.)
- Automatic detection and removal of:
  - Client logos and watermarks
  - Client names and company information
  - PII (names, emails, SSNs, addresses, phone numbers, etc.)
- Preview of cleansing results
- Download cleansed files

### File Analysis Workflow
- Support for diverse file formats: `.pdf`, `.jpg/.png`, `.xlsx`, `.pptx`, `.docx`, `.txt`
- **Text Extraction**: OCR and parsing for images, diagrams, tables, and scanned documents
- **Content Interpretation**: Identifies key elements such as:
  - IAM policy statements
  - Firewall rule entries
  - IDS/IPS log snippets
  - Security configurations
- **Insight Generation**: Provides risk assessment and security recommendations
- Standardized output format for evaluation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LakshyaJain08/ai-test2.git
cd ai-test2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🎯 Usage

### File Cleansing
1. Navigate to the "File Cleansing" tab
2. Upload files using drag-and-drop or the file browser
3. Click "Start Cleansing" to process the files
4. Review the cleansing results showing removed PII and logos
5. Download the cleansed files

### File Analysis
1. Navigate to the "File Analysis" tab
2. Upload files for analysis
3. Click "Start Analysis" to process the files
4. Review extracted text, identified key elements, and security insights
5. Download the comprehensive analysis report

## 🛠️ Technology Stack

- **React 19**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with CSS variables
- **ESLint**: Code quality and consistency

## 📁 Project Structure

```
ai-test2/
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx              # Reusable file upload component
│   │   ├── FileUpload.css
│   │   ├── FileCleansingWorkflow.jsx   # Cleansing workflow UI
│   │   ├── FileCleansingWorkflow.css
│   │   ├── FileAnalysisWorkflow.jsx    # Analysis workflow UI
│   │   └── FileAnalysisWorkflow.css
│   ├── App.jsx                         # Main application component
│   ├── App.css
│   ├── main.jsx                        # Application entry point
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── index.html                          # HTML template
├── package.json                        # Dependencies and scripts
└── README.md                           # Documentation
```

## 🔄 Workflow Design

### File Cleansing Process
1. **Upload**: User uploads files through drag-and-drop or file browser
2. **Analysis**: AI scans for sensitive information (logos, names, PII)
3. **Cleansing**: Automated removal or masking of identified sensitive data
4. **Output**: Cleansed files that cannot be traced back to clients

### File Analysis Process
1. **Upload**: User uploads diverse file formats
2. **Text Extraction**: OCR and parsing applied to extract text from all formats
3. **Content Interpretation**: AI identifies key security elements and patterns
4. **Insight Generation**: System generates risk assessments and recommendations
5. **Output**: Standardized, readable analysis report

## 🔐 Security & Privacy

- All file processing is designed to be performed client-side or in secure backend environments
- No sensitive data is logged or stored unnecessarily
- PII detection and masking follows industry best practices
- Cleansed files ensure anonymity and compliance

## 📝 Notes on Implementation

This is a **frontend prototype** demonstrating the UI and workflow design. In a production environment:

- Backend API integration would handle actual file processing using AI/ML models
- OCR services (like Tesseract, AWS Textract) would extract text from images
- NLP models would identify and mask PII
- Image processing libraries would detect and remove logos/watermarks
- Secure file storage and transfer mechanisms would be implemented

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Author

LakshyaJain08

---

**Note**: This application serves as a working prototype demonstrating the functional design for file cleansing and analysis workflows. For production deployment, backend services with actual AI/ML capabilities would need to be integrated.
