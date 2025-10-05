import { useState } from 'react'
import './App.css'
import FileCleansingWorkflow from './components/FileCleansingWorkflow'
import FileAnalysisWorkflow from './components/FileAnalysisWorkflow'

function App() {
  const [activeTab, setActiveTab] = useState('cleansing')

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>🔒 File Processing & Analysis System</h1>
          <p>Automated solution for cleansing and analyzing security consultant files</p>
        </div>
      </header>

      <div className="container">
        <nav className="tabs">
          <button
            className={`tab ${activeTab === 'cleansing' ? 'active' : ''}`}
            onClick={() => setActiveTab('cleansing')}
          >
            🧹 File Cleansing
          </button>
          <button
            className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            📊 File Analysis
          </button>
        </nav>

        <div className="workflow-container">
          {activeTab === 'cleansing' ? (
            <FileCleansingWorkflow />
          ) : (
            <FileAnalysisWorkflow />
          )}
        </div>
      </div>

      <footer className="app-footer">
        <div className="container">
          <p>© 2024 File Processing System - AI-Powered Security Solutions</p>
        </div>
      </footer>
    </div>
  )
}

export default App
