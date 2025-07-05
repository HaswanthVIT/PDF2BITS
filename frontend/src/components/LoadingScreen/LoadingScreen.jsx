import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ progress, status, onCancel }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="pdf2bits-logo">
          <h1>PDF2BITS</h1>
          <p>Transforming your PDF into bite-sized study cards</p>
        </div>
        
        <div className="processing-animation">
          <div className="processing-circle">
            <div className="processing-fill" style={{ height: `${progress}%` }}>
              <span className="progress-text">{progress}%</span>
            </div>
          </div>
        </div>
        
        <div className="status-info">
          <h3>{status}</h3>
          <div className="processing-steps">
            <div className={`step ${progress > 0 ? 'completed' : 'active'}`}>
              📄 Analyzing PDF structure
            </div>
            <div className={`step ${progress > 25 ? 'completed' : progress > 0 ? 'active' : ''}`}>
              🧠 Extracting key concepts
            </div>
            <div className={`step ${progress > 50 ? 'completed' : progress > 25 ? 'active' : ''}`}>
              ✨ Generating summaries
            </div>
            <div className={`step ${progress > 75 ? 'completed' : progress > 50 ? 'active' : ''}`}>
              📱 Creating study cards
            </div>
          </div>
        </div>
        
        <button onClick={onCancel} className="cancel-button">
          Cancel Processing
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
