import axios from 'axios';

const API_URL = 'https://back-aulas-production.up.railway.app/';

export const getRecursos = async () => {
  const res = await axios.get(${API_URL}/recursos);
  return res.data;
};

export const deleteRecurso = async (id) => {
  const res = await axios.delete(${API_URL}/recursos/${id});
  return res.data;
};

export const createRecurso = async (recurso) => {
  const res = await axios.post(${API_URL}/recursos, recurso);
  return res.data;
};

export const updateRecurso = async (id, recurso) => {
  const res = await axios.put(${API_URL}/recursos/${id}, recurso);
  return res.data;
};