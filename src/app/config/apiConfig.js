// src/config/apiConfig.js

const BASE_URL = 'https://back-aulas-production.up.railway.app';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const apiRequest = async (url, options = {}) => {
  const config = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', { url, error: error.message });
    throw error;
  }
};

export const API_ENDPOINTS = {
  AULAS: {
    GET_ALL: '/aulas',
    GET_BY_ID: (id) => `/aulas/${id}`,
    CREATE: '/aulas',
    UPDATE: (id) => `/aulas/${id}`,
    DELETE: (id) => `/aulas/${id}`,
  },
  RECURSOS: {
    GET_ALL: '/recursos',
    GET_BY_ID: (id) => `/recursos/${id}`,
    CREATE: '/recursos',
    UPDATE: (id) => `/recursos/${id}`,
    DELETE: (id) => `/recursos/${id}`,
  },
};
