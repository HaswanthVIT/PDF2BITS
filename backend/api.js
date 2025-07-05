import axios from 'axios';
const API_BASE_URL = 'https://5a2a-35-233-243-180.ngrok-free.app'; // Use the ngrok URL from Colab output

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  uploadPDF: async (file, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // <-- FIELD NAME IS 'file'
      const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message 
      };
    }
  },
  // ...other API methods
};
