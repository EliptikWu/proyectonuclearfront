// src/app/services/recursosService.js
import axios from "axios";

const API_URL = "https://back-aulas-production.up.railway.app/recursos";

export const getRecursos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteRecurso = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const createRecurso = async (recurso) => {
  const res = await axios.post(API_URL, recurso);
  return res.data;
};

export const updateRecurso = async (id, recurso) => {
  const res = await axios.put(`${API_URL}/${id}`, recurso);
  return res.data;
};

export const toggleEstadoRecurso = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/estado`);
  return res.data;
};
