import { apiRequest, API_ENDPOINTS } from '../config/apiConfig';

class aulasService {
  async getAllAulas() {
    try {
      // En Next.js usamos la ruta API local que creamos
      const data = await apiRequest('/aulas');
      return data;
    } catch (error) {
      console.error('Error fetching aulas:', error);
      throw error;
    }
  }

  // Obtener aulas por sede
  async getAulasBySede(sedeId) {
    try {
      const aulas = await this.getAllAulas();
      return aulas.filter(aula => aula.sedeId === sedeId);
    } catch (error) {
      console.error('Error fetching aulas by sede:', error);
      throw error;
    }
  }

  // Obtener aulas disponibles (estado LIBRE)
  async getAulasDisponibles(sedeId = null) {
    try {
      const aulas = await this.getAllAulas();
      let aulasLibres = aulas.filter(aula => aula.estado === 'LIBRE');
      
      if (sedeId) {
        aulasLibres = aulasLibres.filter(aula => aula.sedeId === sedeId);
      }
      
      return aulasLibres;
    } catch (error) {
      console.error('Error fetching aulas disponibles:', error);
      throw error;
    }
  }

  // Obtener aulas por tipo
  async getAulasByTipo(tipo, sedeId = null) {
    try {
      const aulas = await this.getAllAulas();
      let aulasFiltradas = aulas.filter(aula => 
        aula.tipo === tipo && aula.estado === 'LIBRE'
      );
      
      if (sedeId) {
        aulasFiltradas = aulasFiltradas.filter(aula => aula.sedeId === sedeId);
      }
      
      return aulasFiltradas;
    } catch (error) {
      console.error('Error fetching aulas by tipo:', error);
      throw error;
    }
  }

  // Formatear aulas para dropdown
  formatAulasForDropdown(aulas) {
    return aulas.map(aula => ({
      value: aula.id,
      label: `${aula.nombre} (Cap: ${aula.capacidad})`,
      capacidad: aula.capacidad,
      tipo: aula.tipo,
      sedeId: aula.sedeId
    }));
  }
}

export default new aulasService();