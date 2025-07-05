import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import './CardsScreen.css';


const CardsScreen = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, cards.length]);

  return (
    <div className="cards-screen">
      <div className="cards-header">
        <h1 className="cards-title">Your Study Cards</h1>
        <div className="cards-counter">
          {currentIndex + 1} of {cards.length}
        </div>
      </div>
      
      <div className="cards-container">
        {cards.map((card, index) => (
          <SummaryCard
            key={index}
            summary={card}
            index={index}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      
      <div className="cards-navigation">
        <div className="nav-hint">
          <span>Scroll or use arrow keys to navigate</span>
        </div>
      </div>
    </div>
  );
};

export default CardsScreen;
