import React, { useState } from 'react';
import './SummaryCard.css';

const SummaryCard = ({ card, cardIndex, totalCards }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Store bookmark status in localStorage
    localStorage.setItem(`bookmark_${card.id}`, !isBookmarked);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareOptions = [
    {
      name: 'Copy Text',
      action: () => {
        navigator.clipboard.writeText(card.summary);
        setShowShareMenu(false);
      }
    },
    {
      name: 'Export Card',
      action: () => {
        // Implement export functionality
        console.log('Exporting card:', card);
        setShowShareMenu(false);
      }
    }
  ];

  return (
    <div className="summary-card">
      <div className="card-header">
        <div className="card-number">
          <span className="current">{cardIndex + 1}</span>
          <span className="separator">/</span>
          <span className="total">{totalCards}</span>
        </div>
        
        {card.pageNumber && (
          <div className="page-indicator">
            Page {card.pageNumber}
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="summary-section">
          <div className="section-header">
            <h3>✨ Key Summary</h3>
            {card.confidence && (
              <div className="confidence-badge">
                {Math.round(card.confidence * 100)}% confidence
              </div>
            )}
          </div>
          
          <div className="summary-text">
            {card.summary || card.content || 'No summary available'}
          </div>
          
          {card.keyPoints && (
            <div className="key-points">
              <h4>Key Points:</h4>
              <ul>
                {card.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {card.originalText && (
          <div className="original-section">
            <button 
              className="toggle-original"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              📄 {showOriginal ? 'Hide' : 'Show'} Original Content
            </button>
            
            {showOriginal && (
              <div className="original-content">
                <div className="original-text">
                  {card.originalText}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="card-actions">
          <button 
            className={`action-button bookmark ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmark}
          >
            {isBookmarked ? '📌' : '📍'} {isBookmarked ? 'Saved' : 'Save'}
          </button>
          
          <div className="share-container">
            <button 
              className="action-button share"
              onClick={handleShare}
            >
              🔗 Share
            </button>
            
            {showShareMenu && (
              <div className="share-menu">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    className="share-option"
                    onClick={option.action}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="action-button study">
            🎯 Study Mode
          </button>
        </div>
        
        {card.tags && (
          <div className="card-tags">
            {card.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
