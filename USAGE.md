# Usage Guide - File Processing & Analysis System

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open your browser to `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview  # Preview production build
```

## Using the Application

### File Cleansing Workflow

1. **Navigate to File Cleansing tab** (default view)
2. **Upload files** using one of these methods:
   - Drag and drop files onto the upload area
   - Click "Browse Files" to select files from your computer
3. **Review uploaded files** - You'll see a list of files with their names and sizes
4. **Click "Start Cleansing"** to begin the processing
5. **Review results** showing:
   - PII that was removed/masked
   - Logos and watermarks that were removed
   - Output filename for the cleansed version
6. **Download cleansed files** using the download button

#### Supported PII Detection
- Names
- Email addresses
- Phone numbers
- Social Security Numbers (SSN)
- Account numbers
- Physical addresses
- Other identifying information

### File Analysis Workflow

1. **Navigate to File Analysis tab**
2. **Upload files** for analysis (same methods as cleansing)
3. **Review uploaded files**
4. **Click "Start Analysis"** to begin processing
5. **Review results** including:
   - **Extracted Text**: OCR and parsed content
   - **Key Elements**: Identified security components (IAM policies, firewall rules, IDS/IPS logs)
   - **Insights**: Risk assessment and security recommendations
6. **Download analysis report** for comprehensive documentation

#### Identified Security Elements
- IAM policy statements
- Firewall rule entries
- IDS/IPS log snippets
- Security configurations
- Network settings
- Access control lists

## Supported File Formats

### All Workflows Support
- ✅ PDF documents (`.pdf`)
- ✅ Images - JPG/PNG (`.jpg`, `.jpeg`, `.png`)
- ✅ Excel spreadsheets (`.xlsx`, `.xls`)
- ✅ PowerPoint presentations (`.pptx`, `.ppt`)
- ✅ Word documents (`.docx`, `.doc`)
- ✅ Text files (`.txt`)

## Features Demonstration

### Mock Processing
This prototype uses simulated AI processing to demonstrate:
- How the workflows function
- The type of information extracted
- The format of results
- User interaction patterns

### Production Integration
In a production environment, you would integrate:
- **Backend API** for actual file processing
- **OCR Services** (Tesseract, AWS Textract, Google Vision API)
- **NLP Models** for PII detection and extraction
- **Computer Vision** for logo/watermark detection
- **Security Analysis Engine** for threat assessment
- **Secure Storage** for file handling

## Application Architecture

```
src/
├── components/
│   ├── FileUpload.jsx              # Reusable upload component
│   ├── FileCleansingWorkflow.jsx   # Cleansing workflow UI
│   └── FileAnalysisWorkflow.jsx    # Analysis workflow UI
├── App.jsx                         # Main app with tab navigation
├── main.jsx                        # React entry point
└── *.css                           # Component styles
```

## Development Tips

### Adding New File Types
1. Update the `accept` attribute in `FileUpload.jsx`
2. Add handling logic in workflow components
3. Update documentation

### Customizing Mock Data
Edit the `generateMock*` functions in workflow components to customize:
- Extracted text samples
- Key element types
- Insight generation

### Styling
- Global styles: `src/index.css`
- Component styles: Individual `.css` files
- CSS variables in `:root` for theming

## Troubleshooting

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
npm run dev -- --port 5174
```

### File Upload Not Working
- Check browser console for errors
- Ensure file types are in the allowed list
- Verify file sizes are reasonable

## Next Steps

For production deployment:
1. Integrate backend API endpoints
2. Implement actual AI/ML processing
3. Add authentication/authorization
4. Set up secure file storage
5. Add rate limiting and validation
6. Implement comprehensive error handling
7. Add unit and integration tests
8. Set up CI/CD pipeline

## Support

For issues or questions, please refer to the main README.md or create an issue in the repository.
