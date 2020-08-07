import http from "../http-common";

class SolicitarolDataService {
  getAll() {
    return http.get("/solicitarols");
  }

  create(data) {
    return http.post("/solicitarols", data);
  }

  delete(id) {
    return http.delete(`/solicitarols/${id}`);
  }

  deleteAll() {
    return http.delete(`/solicitarols`);
  }

  findByComentario(comentario) {
    return http.get(`/solicitarols?comentario=${comentario}`);
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
}

export default new SolicitarolDataService();