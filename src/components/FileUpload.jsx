import { useState, useRef } from 'react'
import './FileUpload.css'

function FileUpload({ onFilesUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    onFilesUpload(fileArray)
  }

  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <div className="file-upload-container">
      <form 
        className={`upload-form ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          className="input-file"
          multiple
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.txt"
        />
        
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <p className="upload-text">
            <strong>Drag and drop files here</strong> or
          </p>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onButtonClick}
          >
            Browse Files
          </button>
          <p className="upload-hint">
            Supports: PDF, Images (JPG, PNG), Excel, PowerPoint, Word, Text files
          </p>
        </div>
      </form>
    </div>
  )
}

export default FileUpload
