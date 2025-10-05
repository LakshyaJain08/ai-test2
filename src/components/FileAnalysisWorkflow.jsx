import { useState } from 'react'
import FileUpload from './FileUpload'
import './FileAnalysisWorkflow.css'

function FileAnalysisWorkflow() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState(null)

  const handleFilesUpload = (files) => {
    setUploadedFiles(files)
    setResults(null)
  }

  const simulateAnalysis = () => {
    setProcessing(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockResults = uploadedFiles.map(file => {
        const fileType = file.type || file.name.split('.').pop()
        
        return {
          originalName: file.name,
          fileType: fileType,
          extractedText: generateMockExtractedText(fileType),
          keyElements: generateMockKeyElements(fileType),
          insights: generateMockInsights(),
          status: 'success'
        }
      })
      
      setResults(mockResults)
      setProcessing(false)
    }, 2500)
  }

  const generateMockExtractedText = (fileType) => {
    if (fileType.includes('image') || fileType.includes('png') || fileType.includes('jpg')) {
      return 'OCR Extract: Network Firewall Configuration\nRule #001: Allow TCP port 443 from 192.168.1.0/24 to 10.0.0.5\nRule #002: Deny all incoming traffic on port 23\nRule #003: Allow ICMP echo request from trusted sources'
    } else if (fileType.includes('pdf')) {
      return 'IAM Policy Document\n{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": ["s3:GetObject", "s3:PutObject"],\n      "Resource": "arn:aws:s3:::bucket/*"\n    }\n  ]\n}'
    } else if (fileType.includes('sheet') || fileType.includes('xlsx')) {
      return 'IDS/IPS Log Analysis\nTimestamp | Source IP | Destination | Alert Type | Severity\n2024-01-15 | 203.0.113.45 | 10.0.1.20 | Port Scan | High\n2024-01-15 | 198.51.100.23 | 10.0.1.20 | SQL Injection | Critical'
    } else if (fileType.includes('presentation') || fileType.includes('pptx')) {
      return 'Security Assessment Findings\n- 15 Critical vulnerabilities identified\n- Network segmentation recommended\n- MFA implementation needed\n- Regular security audits required'
    } else {
      return 'Document Content Extracted\nSecurity configuration details and policy statements have been successfully parsed and are ready for analysis.'
    }
  }

  const generateMockKeyElements = (fileType) => {
    if (fileType.includes('image') || fileType.includes('png') || fileType.includes('jpg')) {
      return [
        { type: 'Firewall Rule', value: 'TCP 443 Allow Rule', location: 'Line 2' },
        { type: 'Firewall Rule', value: 'Telnet Deny Rule', location: 'Line 3' },
        { type: 'Network Range', value: '192.168.1.0/24', location: 'Line 2' }
      ]
    } else if (fileType.includes('pdf')) {
      return [
        { type: 'IAM Policy', value: 'S3 Read/Write Policy', location: 'Statement[0]' },
        { type: 'AWS Resource', value: 'S3 Bucket ARN', location: 'Resource field' },
        { type: 'Permission', value: 'GetObject, PutObject', location: 'Action field' }
      ]
    } else if (fileType.includes('sheet') || fileType.includes('xlsx')) {
      return [
        { type: 'Security Event', value: 'Port Scan Detected', location: 'Row 2' },
        { type: 'Threat Level', value: 'High/Critical', location: 'Severity Column' },
        { type: 'IP Address', value: 'Multiple suspicious IPs', location: 'Source IP Column' }
      ]
    } else {
      return [
        { type: 'Security Finding', value: 'Critical vulnerabilities', location: 'Page 1' },
        { type: 'Recommendation', value: 'Network segmentation', location: 'Page 2' }
      ]
    }
  }

  const generateMockInsights = () => {
    return {
      summary: 'Document successfully analyzed and processed',
      riskLevel: Math.random() > 0.5 ? 'Medium' : 'High',
      recommendations: [
        'Review and update firewall rules quarterly',
        'Implement least privilege access controls',
        'Enable comprehensive logging and monitoring'
      ]
    }
  }

  const downloadAnalysisReport = () => {
    alert('In a production environment, a comprehensive analysis report would be downloaded here.')
  }

  return (
    <div className="workflow">
      <div className="workflow-header">
        <h2>File Analysis Workflow</h2>
        <p>Upload files for automated text extraction, content interpretation, and security analysis</p>
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
              onClick={simulateAnalysis}
              disabled={processing}
            >
              {processing ? '🔄 Analyzing...' : '📊 Start Analysis'}
            </button>
          </div>
        )}

        {results && (
          <div className="results-section">
            <h3>✅ Analysis Results</h3>
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <span className="result-status success">✓ Analyzed</span>
                  <span className="result-file-name">{result.originalName}</span>
                </div>
                
                <div className="result-details">
                  <div className="detail-section">
                    <h4>📝 Extracted Text</h4>
                    <pre className="extracted-text">{result.extractedText}</pre>
                  </div>
                  
                  <div className="detail-section">
                    <h4>🔍 Key Elements Identified</h4>
                    <div className="key-elements">
                      {result.keyElements.map((element, idx) => (
                        <div key={idx} className="key-element">
                          <span className="element-type">{element.type}</span>
                          <span className="element-value">{element.value}</span>
                          <span className="element-location">{element.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>💡 Insights & Recommendations</h4>
                    <div className="insights">
                      <p><strong>Summary:</strong> {result.insights.summary}</p>
                      <p><strong>Risk Level:</strong> <span className={`risk-badge ${result.insights.riskLevel.toLowerCase()}`}>{result.insights.riskLevel}</span></p>
                      <div className="recommendations">
                        <strong>Recommendations:</strong>
                        <ul>
                          {result.insights.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              className="btn btn-secondary"
              onClick={downloadAnalysisReport}
            >
              ⬇️ Download Analysis Report
            </button>
          </div>
        )}

        {!uploadedFiles.length && !results && (
          <div className="info-box">
            <h3>📋 Analysis Capabilities</h3>
            <ol>
              <li><strong>Text Extraction:</strong> OCR and parsing for images, PDFs, spreadsheets, and presentations</li>
              <li><strong>Content Interpretation:</strong> Identifies IAM policies, firewall rules, IDS/IPS logs, and security configurations</li>
              <li><strong>Data Standardization:</strong> Converts diverse formats into consistent, readable text</li>
              <li><strong>Insight Generation:</strong> Extracts meaningful security insights and recommendations</li>
            </ol>
            
            <div className="supported-formats">
              <strong>Supported Formats:</strong>
              <div className="format-badges">
                <span className="format-badge">.pdf</span>
                <span className="format-badge">.jpeg/.png</span>
                <span className="format-badge">.xlsx</span>
                <span className="format-badge">.pptx</span>
                <span className="format-badge">.docx</span>
                <span className="format-badge">.txt</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileAnalysisWorkflow
