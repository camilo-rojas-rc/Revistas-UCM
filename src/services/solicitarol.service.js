import http from "../http-common";

class SolicitarolDataService {
  getAll() {
    return http.get("/solicitarols");
  }

  get(id) {
    return http.get(`/solicitarols/${id}`);
  }

  create(data) {
    return http.post("/solicitarols", data);
  }

  update(id, data) {
    return http.put(`/solicitarols/${id}`, data);
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
}

export default new SolicitarolDataService();