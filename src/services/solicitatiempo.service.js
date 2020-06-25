import http from "../http-common";

class SolicitatiempoDataService {
  getAll() {
    return http.get("/solicitatiempos");
  }

  get(id) {
    return http.get(`/solicitatiempos/${id}`);
  }

  create(data) {
    return http.post("/solicitatiempos", data);
  }

  update(id, data) {
    return http.put(`/solicitatiempos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/solicitatiempos/${id}`);
  }

  deleteAll() {
    return http.delete(`/solicitatiempos`);
  }

  findByComentario(comentario) {
    return http.get(`/solicitatiempos?comentario=${comentario}`);
  }
}

export default new SolicitatiempoDataService();