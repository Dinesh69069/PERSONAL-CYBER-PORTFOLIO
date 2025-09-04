// API configuration for different environments
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://server-2-sijx.onrender.com'
    : '', // Use proxy in development (empty string means relative to current origin)
  ENDPOINTS: {
    CHAT: '/api/chat',
    CONTACT: '/api/contact',
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
