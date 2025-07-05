import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-animation">
          <div className="loading-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
          <div className="loading-pulse"></div>
        </div>
        
        <div className="loading-content">
          <h2 className="loading-title">
            Processing Your PDF
          </h2>
          <p className="loading-subtitle">
            Our AI is analyzing your document and creating bite-sized summaries
          </p>
          
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-text">Creating summaries...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
