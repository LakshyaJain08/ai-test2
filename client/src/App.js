import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('process'); // 'cleanse', 'analyze', or 'process'

  const handleProcessComplete = (data) => {
    setResults(data);
    setLoading(false);
    setError(null);
  };

  const handleProcessStart = () => {
    setLoading(true);
    setError(null);
    setResults(null);
  };

  const handleError = (err) => {
    setError(err);
    setLoading(false);
  };

  const resetApp = () => {
    setResults(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI File Cleansing & Analysis Tool</h1>
        <p className="subtitle">Automated PII Removal and Security Analysis</p>
      </header>

      <main className="App-main">
        <div className="mode-selector">
          <button 
            className={mode === 'cleanse' ? 'active' : ''} 
            onClick={() => { setMode('cleanse'); resetApp(); }}
          >
            File Cleansing
          </button>
          <button 
            className={mode === 'analyze' ? 'active' : ''} 
            onClick={() => { setMode('analyze'); resetApp(); }}
          >
            File Analysis
          </button>
          <button 
            className={mode === 'process' ? 'active' : ''} 
            onClick={() => { setMode('process'); resetApp(); }}
          >
            Complete Processing
          </button>
        </div>

        <div className="content-container">
          <FileUpload
            mode={mode}
            onProcessStart={handleProcessStart}
            onProcessComplete={handleProcessComplete}
            onError={handleError}
          />

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Processing your file...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <h3>Error</h3>
              <p>{error}</p>
              <button onClick={resetApp}>Try Again</button>
            </div>
          )}

          {results && !loading && (
            <Results results={results} mode={mode} onReset={resetApp} />
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>AI-Powered Security Consultant Tool | Supports PDF, Excel, Word, PowerPoint, Images, and Text files</p>
      </footer>
    </div>
  );
}

export default App;
