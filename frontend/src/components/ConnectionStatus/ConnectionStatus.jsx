import React from 'react';
import './ConnectionStatus.css';

const ConnectionStatus = ({ status, onRetry }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'connected':
        return {
          icon: '🟢',
          text: 'Connected to PDF2BITS API',
          className: 'connected'
        };
      case 'disconnected':
        return {
          icon: '🔴',
          text: 'API Connection Failed',
          className: 'disconnected'
        };
      case 'checking':
        return {
          icon: '🟡',
          text: 'Checking Connection...',
          className: 'checking'
        };
      default:
        return {
          icon: '⚫',
          text: 'Unknown Status',
          className: 'unknown'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`connection-status ${statusInfo.className}`}>
      <div className="status-content">
        <span className="status-icon">{statusInfo.icon}</span>
        <span className="status-text">{statusInfo.text}</span>
        {status === 'disconnected' && (
          <button onClick={onRetry} className="retry-button">
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
