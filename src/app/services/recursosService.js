import axios from "axios";

// Usamos rutas locales de Next.js (proxy interno)
const API_URL = "/api/recursos";

export const getRecursos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteRecurso = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const toggleEstadoRecurso = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/estado`);
  return response.data;
};

export const createRecurso = async (recurso) => {
  const response = await axios.post(API_URL, recurso);
  return response.data;
};

export const updateRecurso = async (id, recurso) => {
  const response = await axios.put(`${API_URL}/${id}`, recurso);
  return response.data;
};
