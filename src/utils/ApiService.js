// src/services/apiService.js
import axios from 'axios';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
    // Add any common headers here
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (redirect to login)
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// HTTP Methods
const apiService = {
  get: (url, params = {}, config = {}) => apiClient.get(url, { ...config, params }),

  post: (url, data = {}, config = {}) => apiClient.post(url, data, config),

  put: (url, data = {}, config = {}) => apiClient.put(url, data, config),

  patch: (url, data = {}, config = {}) => apiClient.patch(url, data, config),

  delete: (url, config = {}) => apiClient.delete(url, config),

  // File upload helper
  upload: (url, file, fieldName = 'file', config = {}) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    return apiClient.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default apiService;
