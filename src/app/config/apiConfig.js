// src/app/config/apiConfig.js

export const apiRequest = async (url, options = {}) => {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Request Error:", error);
    throw error;
  }
};

export const API_ENDPOINTS = {
  AULAS: {
    GET_ALL: "https://back-aulas-production.up.railway.app/aulas",
    GET_BY_ID: (id) => `https://back-aulas-production.up.railway.app/aulas/${id}`,
    CREATE: "https://back-aulas-production.up.railway.app/aulas",
    UPDATE: (id) => `https://back-aulas-production.up.railway.app/aulas/${id}`,
    DELETE: (id) => `https://back-aulas-production.up.railway.app/aulas/${id}`,
  },
};
