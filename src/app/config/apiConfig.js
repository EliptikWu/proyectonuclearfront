import { API_BASE_URL_AULAS } from './constants';

// Configuración por defecto para fetch
const defaultFetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Agregar otras configuraciones como timeout, etc.
};

// Función helper para hacer requests con configuración por defecto
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
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Endpoints específicos
export const API_ENDPOINTS = {
  AULAS: {
    GET_ALL: API_BASE_URL_AULAS,
    GET_BY_ID: (id) => `${API_BASE_URL_AULAS}/${id}`,
    CREATE: API_BASE_URL_AULAS,
    UPDATE: (id) => `${API_BASE_URL_AULAS}/${id}`,
    DELETE: (id) => `${API_BASE_URL_AULAS}/${id}`,
  }
};

export default apiRequest;