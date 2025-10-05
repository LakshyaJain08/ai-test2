import { useState } from 'react'
import FileUpload from './FileUpload'
import './FileCleansingWorkflow.css'

function FileCleansingWorkflow() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState(null)

  const handleFilesUpload = (files) => {
    setUploadedFiles(files)
    setResults(null)
  }

  const simulateCleansing = () => {
    setProcessing(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockResults = uploadedFiles.map(file => ({
        originalName: file.name,
        size: file.size,
        type: file.type,
        cleansedName: `cleansed_${file.name}`,
        piiRemoved: ['Client Name: ACME Corp', 'Email: john.doe@acme.com', 'SSN: ***-**-1234'],
        logosRemoved: ['Company Logo (Top-right corner)', 'Watermark (Footer)'],
        status: 'success'
      }))
      
      setResults(mockResults)
      setProcessing(false)
    }, 2000)
  }

  const downloadCleansedFiles = () => {
    alert('In a production environment, cleansed files would be downloaded here.')
  }

  return (
    <div className="workflow">
      <div className="workflow-header">
        <h2>File Cleansing Workflow</h2>
        <p>Upload files to automatically remove client logos, names, and Personally Identifiable Information (PII)</p>
      </div>

      <div className="workflow-content">
        <FileUpload onFilesUpload={handleFilesUpload} />

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files-section">
            <h3>📁 Uploaded Files ({uploadedFiles.length})</h3>
            <ul className="file-list">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-icon">📄</span>
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-meta">{(file.size / 1024).toFixed(2)} KB • {file.type || 'Unknown type'}</div>
                  </div>
                </li>
              ))}
            </ul>

            <button 
              className="btn btn-primary"
              onClick={simulateCleansing}
              disabled={processing}
            >
              {processing ? '🔄 Processing...' : '🧹 Start Cleansing'}
            </button>
          </div>
        )}

        {results && (
          <div className="results-section">
            <h3>✅ Cleansing Results</h3>
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <span className="result-status success">✓ Cleansed</span>
                  <span className="result-file-name">{result.originalName}</span>
                </div>
                
                <div className="result-details">
                  <div className="detail-section">
                    <h4>🔒 PII Removed/Masked</h4>
                    <ul>
                      {result.piiRemoved.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detail-section">
                    <h4>🖼️ Logos/Watermarks Removed</h4>
                    <ul>
                      {result.logosRemoved.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>📦 Output File</h4>
                    <p className="output-filename">{result.cleansedName}</p>
                  </div>
                </div>
              </div>
            ))}

            <button 
              className="btn btn-secondary"
              onClick={downloadCleansedFiles}
            >
              ⬇️ Download Cleansed Files
            </button>
          </div>
        )}

        {!uploadedFiles.length && !results && (
          <div className="info-box">
            <h3>📋 How It Works</h3>
            <ol>
              <li><strong>Upload Files:</strong> Select files containing client information (PDFs, images, spreadsheets, presentations)</li>
              <li><strong>AI Analysis:</strong> System scans for logos, client names, and PII</li>
              <li><strong>Automatic Cleansing:</strong> Sensitive information is removed or masked</li>
              <li><strong>Download:</strong> Get cleansed files that cannot be traced back to clients</li>
            </ol>
            
            <div className="pii-info">
              <strong>PII includes:</strong> Names, addresses, email addresses, phone numbers, SSN, account numbers, and other identifying information.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileCleansingWorkflow
