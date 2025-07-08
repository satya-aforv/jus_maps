import apiService from '../../utils/ApiService';

// GET request
export const login = async (userData) => {
  try {
    const response = await apiService.post('/auth/login', userData);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw to let caller handle
  }
};

// POST request
export const createUser = async (userData) => {
  try {
    const response = await apiService.post('/users', userData);
    return response;
  } catch (error) {
    console.error('User creation failed:', error);
    throw error;
  }
};

// File upload
export const uploadAvatar = async (file) => {
  try {
    const response = await apiService.upload('/users/avatar', file);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
