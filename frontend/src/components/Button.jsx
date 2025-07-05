import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  glowing = false,
  onClick,
  disabled,
  ...props 
}) => {
  const buttonClass = `
    premium-btn 
    premium-btn--${variant} 
    premium-btn--${size}
    ${glowing ? 'premium-btn--glowing' : ''}
    ${disabled ? 'premium-btn--disabled' : ''}
  `.trim();

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="premium-btn__content">
        {children}
      </span>
      <div className="premium-btn__shine"></div>
    </button>
  );
};

export default Button;
