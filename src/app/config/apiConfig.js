import { API_BASE_URL_AULAS } from './constants';

// Configuración para desarrollo y producción
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración por defecto para fetch
const defaultFetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const apiRequest = async (url, options = {}) => {
  const config = {
    ...defaultFetchConfig,
    ...options,
    headers: {
      ...defaultFetchConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', {
      url,
      error: error.message,
    });
    throw error;
  }
};

// Endpoints específicos
export const API_ENDPOINTS = {
  AULAS: {
    GET_ALL: '/aulas', // Ruta relativa en desarrollo (proxy)
    GET_BY_ID: (id) => `/aulas/${id}`,
    CREATE: '/aulas',
    UPDATE: (id) => `/aulas/${id}`,
    DELETE: (id) => `/aulas/${id}`,
  }
};