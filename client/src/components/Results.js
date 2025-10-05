import React, { useState } from 'react';
import './Results.css';

function Results({ results, mode, onReset }) {
  const [showFullText, setShowFullText] = useState(false);

  const renderCleansingResults = () => {
    if (!results.detectedPII && !results.cleansedText) return null;

    return (
      <div className="results-section">
        <h3>🛡️ PII Detection & Cleansing Results</h3>
        
        {results.detectedPII && results.detectedPII.length > 0 ? (
          <div className="pii-detection">
            <h4>Detected & Masked PII:</h4>
            <div className="pii-list">
              {results.detectedPII.map((pii, index) => (
                <div key={index} className="pii-item">
                  <span className="pii-type">{pii.type}</span>
                  <span className="pii-count">{pii.count} occurrence(s)</span>
                  {pii.examples && (
                    <div className="pii-examples">
                      <small>Examples: {pii.examples.join(', ')}</small>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-pii">✓ No PII detected in this document</p>
        )}

        {results.cleansedText && (
          <div className="cleansed-text">
            <h4>Cleansed Text Output:</h4>
            <div className="text-preview">
              <pre>
                {showFullText || results.cleansedText.length < 1000
                  ? results.cleansedText
                  : results.cleansedText.substring(0, 1000) + '...'}
              </pre>
            </div>
            {results.textLength > 1000 && (
              <button 
                className="toggle-text-btn"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? 'Show Less' : 'Show More'}
              </button>
            )}
            <p className="text-info">Total length: {results.textLength} characters</p>
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisResults = () => {
    if (!results.analysis) return null;

    const { analysis } = results;

    return (
      <div className="results-section">
        <h3>📊 Content Analysis Results</h3>
        
        <div className="analysis-stats">
          <div className="stat-card">
            <div className="stat-value">{analysis.wordCount}</div>
            <div className="stat-label">Words</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{analysis.characterCount}</div>
            <div className="stat-label">Characters</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {analysis.containsSecurityKeywords ? '✓' : '✗'}
            </div>
            <div className="stat-label">Security Content</div>
          </div>
        </div>

        {analysis.securityElements && analysis.securityElements.length > 0 && (
          <div className="security-elements">
            <h4>🔒 Security Elements Detected:</h4>
            <div className="elements-list">
              {analysis.securityElements.map((element, index) => (
                <div key={index} className="element-item">
                  <span className="element-category">{element.category}</span>
                  <span className="element-count">{element.count} references</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.insights && analysis.insights.length > 0 && (
          <div className="insights">
            <h4>💡 Insights:</h4>
            <ul>
              {analysis.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        )}

        {results.extractedTextPreview && (
          <div className="text-preview-section">
            <h4>Extracted Text Preview:</h4>
            <div className="text-preview">
              <pre>{results.extractedTextPreview}</pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProcessResults = () => {
    if (!results.cleansing && !results.analysis) return null;

    return (
      <>
        <div className="results-section">
          <h3>🛡️ Cleansing Results</h3>
          
          {results.cleansing.detectedPII && results.cleansing.detectedPII.length > 0 ? (
            <div className="pii-detection">
              <h4>Detected & Masked PII:</h4>
              <div className="pii-list">
                {results.cleansing.detectedPII.map((pii, index) => (
                  <div key={index} className="pii-item">
                    <span className="pii-type">{pii.type}</span>
                    <span className="pii-count">{pii.count} occurrence(s)</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="no-pii">✓ No PII detected</p>
          )}
        </div>

        <div className="results-section">
          <h3>📊 Analysis Results</h3>
          
          <div className="analysis-stats">
            <div className="stat-card">
              <div className="stat-value">{results.analysis.wordCount}</div>
              <div className="stat-label">Words</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{results.analysis.characterCount}</div>
              <div className="stat-label">Characters</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {results.analysis.containsSecurityKeywords ? '✓' : '✗'}
              </div>
              <div className="stat-label">Security Content</div>
            </div>
          </div>

          {results.analysis.securityElements && results.analysis.securityElements.length > 0 && (
            <div className="security-elements">
              <h4>🔒 Security Elements:</h4>
              <div className="elements-list">
                {results.analysis.securityElements.map((element, index) => (
                  <div key={index} className="element-item">
                    <span className="element-category">{element.category}</span>
                    <span className="element-count">{element.count} references</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.cleansing.cleansedText && (
            <div className="cleansed-text">
              <h4>Cleansed Text Output:</h4>
              <div className="text-preview">
                <pre>
                  {showFullText || results.cleansing.cleansedText.length < 1000
                    ? results.cleansing.cleansedText
                    : results.cleansing.cleansedText.substring(0, 1000) + '...'}
                </pre>
              </div>
              {results.cleansing.totalLength > 1000 && (
                <button 
                  className="toggle-text-btn"
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {showFullText ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Processing Results</h2>
        <div className="file-info">
          <span className="file-name">📄 {results.originalFileName}</span>
          {results.fileType && <span className="file-type">{results.fileType}</span>}
        </div>
      </div>

      {mode === 'cleanse' && renderCleansingResults()}
      {mode === 'analyze' && renderAnalysisResults()}
      {mode === 'process' && renderProcessResults()}

      <div className="results-actions">
        <button className="reset-button" onClick={onReset}>
          Process Another File
        </button>
      </div>
    </div>
  );
}

export default Results;
