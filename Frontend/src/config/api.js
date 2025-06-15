// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    MESSAGE: '/api/message',
    HEALTH: '/api/health'
  },
  TIMEOUT: 10000 // 10 seconds
};

export default API_CONFIG;
