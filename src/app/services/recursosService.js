import axios from "axios";

const API_URL = "https://back-aulas-production.up.railway.app/recursos";

export const getRecursos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// CAMBIA ESTO 👇
export const deleteRecurso = async (id) => {
  try {
    const response = await axios.delete(/api/recursos/${id}); // usa la API interna de Next
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el recurso:", error);
    throw error;
  }
};

export const toggleEstadoRecurso = async (id) => {
  const response = await axios.patch(${API_URL}/${id}/estado);
  return response.data;
};