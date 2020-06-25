import http from "../http-common";

class UserareaDataService {
  getAll() {
    return http.get("/userareas");
  }

  get(id) {
    return http.get(`/userareas/${id}`);
  }

  create(data) {
    return http.post("/userareas", data);
  }

  update(id, data) {
    return http.put(`/userareas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/userareas/${id}`);
  }

  deleteAll() {
    return http.delete(`/userareas`);
  }

  findById_user(id_user) {
    return http.get(`/userareas?id_user=${id_user}`);
  }
}

export default new UserareaDataService();