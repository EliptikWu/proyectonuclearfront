import axios from "axios";

// Usamos rutas locales de Next.js (proxy interno)
const API_URL = "/api/aulas";

export const getAulas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteAula = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const toggleEstadoAula = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/estado`);
  return response.data;
};

export const createAula = async (aula) => {
  const response = await axios.post(API_URL, aula);
  return response.data;
};

export const updateAula = async (id, aula) => {
  const response = await axios.put(`${API_URL}/${id}`, aula);
  return response.data;
};
