import React, { useRef, useState } from 'react';
import Button from './Button';
import './UploadScreen.css';

const UploadScreen = ({ onFileUpload }) => {
  const fileInputRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      onFileUpload(file);
    } else {
      alert('Please select a PDF file');
    }
    event.target.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  return (
    <div className="upload-screen">
      <div className="upload-container">
        <div className="upload-header">
          <h1 className="upload-title">
            <span className="title-gradient">PDF</span>
            <span className="title-accent">2</span>
            <span className="title-gradient">BITS</span>
          </h1>
          <p className="upload-subtitle">
            Transform your PDF into bite-sized, scrollable study cards
          </p>
        </div>

        <div 
          className={`upload-area ${isDragOver ? 'drag-over' : ''} ${isHovered ? 'hovered' : ''}`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={0}
          role="button"
          aria-label="Upload PDF file"
        >
          <div className="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
              <path d="M9 15l3 -3l3 3" />
              <path d="M12 12l0 9" />
            </svg>
          </div>
          <div className="upload-content">
            <h3>Drop your PDF here</h3>
            <p>or click to browse files</p>
            <span className="upload-formats">Supports PDF files up to 50MB</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="upload-actions">
          <Button 
            variant="neon" 
            size="large" 
            glowing
            onClick={() => fileInputRef.current.click()}
          >
            Select PDF File
          </Button>
        </div>

        <div className="upload-features">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <span>AI-Powered Summaries</span>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <span>Mobile-Optimized</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <span>Secure Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
