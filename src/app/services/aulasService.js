import { apiRequest, API_ENDPOINTS } from '../config/apiConfig';

class AulasService {
  getAllAulas() {
    return apiRequest(API_ENDPOINTS.AULAS.GET_ALL);
  }

  getAulaById(id) {
    return apiRequest(API_ENDPOINTS.AULAS.GET_BY_ID(id));
  }

  createAula(data) {
    return apiRequest(API_ENDPOINTS.AULAS.CREATE, {
      method: 'POST',
      body: data,
    });
  }

  updateAula(id, data) {
    return apiRequest(API_ENDPOINTS.AULAS.UPDATE(id), {
      method: 'PUT',
      body: data,
    });
  }

  deleteAula(id) {
    return apiRequest(API_ENDPOINTS.AULAS.DELETE(id), {
      method: 'DELETE',
    });
  }
}

export default new AulasService();
