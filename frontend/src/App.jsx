import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import UploadInterface from './components/UploadScreen';
import ScrollableContainer from './components/CardsScreen';
import ConnectionStatus from './components/ConnectionStatus/ConnectionStatus';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('upload'); // 'upload', 'processing', 'cards'
  const [studyCards, setStudyCards] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [error, setError] = useState(null);

  // Check API connection on app load
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    const result = await apiService.healthCheck();
    setConnectionStatus(result.success ? 'connected' : 'disconnected');
  };

  const handleFileUpload = async (file) => {
    setError(null);
    setCurrentView('processing');
    setProcessingStatus('Uploading PDF...');
    
    try {
      const result = await apiService.uploadPDF(file, setUploadProgress);
      
      if (result.success) {
        setProcessingStatus('Processing PDF content...');
        
        // Handle the response based on your Phase 2 API structure
        if (result.data.cards) {
          // Direct response with cards
          setStudyCards(result.data.cards);
          setCurrentView('cards');
        } else if (result.data.task_id) {
          // Async processing - poll for status
          pollProcessingStatus(result.data.task_id);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error.message);
      setCurrentView('upload');
    }
  };

  const pollProcessingStatus = async (taskId) => {
    const pollInterval = setInterval(async () => {
      const result = await apiService.getProcessingStatus(taskId);
      
      if (result.success) {
        const { status, progress, cards, error } = result.data;
        
        setProcessingStatus(progress || 'Processing...');
        
        if (status === 'completed' && cards) {
          clearInterval(pollInterval);
          setStudyCards(cards);
          setCurrentView('cards');
        } else if (status === 'failed') {
          clearInterval(pollInterval);
          setError(error || 'Processing failed');
          setCurrentView('upload');
        }
      }
    }, 2000); // Poll every 2 seconds

    // Clear interval after 5 minutes to prevent infinite polling
    setTimeout(() => clearInterval(pollInterval), 300000);
  };

  const handleBackToUpload = () => {
    setCurrentView('upload');
    setStudyCards([]);
    setUploadProgress(0);
    setProcessingStatus('');
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    checkConnection();
  };

  return (
    <div className="app">
      <ConnectionStatus 
        status={connectionStatus} 
        onRetry={handleRetry}
      />
      
      {currentView === 'upload' && (
        <UploadInterface
          onFileUpload={handleFileUpload}
          isConnected={connectionStatus === 'connected'}
          error={error}
          onRetry={handleRetry}
        />
      )}
      
      {currentView === 'processing' && (
        <LoadingScreen
          progress={uploadProgress}
          status={processingStatus}
          onCancel={handleBackToUpload}
        />
      )}
      
      {currentView === 'cards' && (
        <ScrollableContainer
          cards={studyCards}
          onBackToUpload={handleBackToUpload}
        />
      )}
    </div>
  );
}

export default App;
