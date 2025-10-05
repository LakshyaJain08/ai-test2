import React, { useState, useRef } from 'react';
import axios from 'axios';
import './FileUpload.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function FileUpload({ mode, onProcessStart, onProcessComplete, onError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      onError('Unsupported file type. Please upload PDF, Excel, Word, PowerPoint, Image, or Text files.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      onError('File size exceeds 50MB limit.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      onError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const endpoint = mode === 'cleanse' ? '/api/cleanse' : 
                     mode === 'analyze' ? '/api/analyze' : 
                     '/api/process';

    onProcessStart();

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onProcessComplete(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      onError(error.response?.data?.error || 'Failed to process file. Please try again.');
    }
  };

  const getModeDescription = () => {
    switch (mode) {
      case 'cleanse':
        return 'Remove or mask sensitive client information, logos, names, and PII from your files.';
      case 'analyze':
        return 'Extract and analyze text content from various file formats using OCR and parsing methods.';
      case 'process':
        return 'Complete workflow: cleanse PII and analyze content in one step.';
      default:
        return '';
    }
  };

  return (
    <div className="file-upload-container">
      <div className="mode-description">
        <h2>{mode === 'cleanse' ? 'File Cleansing' : mode === 'analyze' ? 'File Analysis' : 'Complete Processing'}</h2>
        <p>{getModeDescription()}</p>
      </div>

      <div 
        className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          accept=".pdf,.xlsx,.xls,.docx,.pptx,.jpg,.jpeg,.png,.txt"
        />
        
        <div className="drop-zone-content">
          {selectedFile ? (
            <>
              <div className="file-icon">📄</div>
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              <button 
                className="change-file-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
              >
                Change File
              </button>
            </>
          ) : (
            <>
              <div className="upload-icon">⬆️</div>
              <p className="drop-zone-text">
                Drag and drop your file here, or click to browse
              </p>
              <p className="supported-formats">
                Supported: PDF, Excel, Word, PowerPoint, JPG, PNG, TXT
              </p>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <button className="upload-button" onClick={handleUpload}>
          {mode === 'cleanse' ? 'Cleanse File' : 
           mode === 'analyze' ? 'Analyze File' : 
           'Process File'}
        </button>
      )}
    </div>
  );
}

export default FileUpload;
