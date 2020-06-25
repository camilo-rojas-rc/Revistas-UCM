import http from "../http-common";

class AsignacionDataService {
  getAll() {
    return http.get("/asignacions");
  }

  get(id) {
    return http.get(`/asignacions/${id}`);
  }

  create(data) {
    return http.post("/asignacions", data);
  }

  update(id, data) {
    return http.put(`/asignacions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/asignacions/${id}`);
  }

  deleteAll() {
    return http.delete(`/asignacions`);
  }

  findByEstado(estado) {
    return http.get(`/asignacions?estado=${estado}`);
  }
}

export default new AsignacionDataService();