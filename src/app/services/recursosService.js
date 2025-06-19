// src/app/services/recursosService.js
import axios from "axios";

// Proxy interno de Next.js
const API_URL = "/api/recursos";

// Obtener todos los recursos
export const getRecursos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Eliminar recurso por ID
export const deleteRecurso = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Cambiar estado del recurso (ciclo DISPONIBLE → NO DISPONIBLE → EN MANTENIMIENTO → DISPONIBLE)
export const toggleEstadoRecurso = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/estado`);
  return response.data;
};

// Crear nuevo recurso
export const createRecurso = async (recurso) => {
  const response = await axios.post(API_URL, recurso);
  return response.data;
};

// Actualizar recurso existente
export const updateRecurso = async (id, recurso) => {
  const response = await axios.put(`${API_URL}/${id}`, recurso);
  return response.data;
};
