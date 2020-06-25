import http from "../http-common";

class TutorialareaDataService {
  getAll() {
    return http.get("/tutorialareas");
  }

  get(id) {
    return http.get(`/tutorialareas/${id}`);
  }

  create(data) {
    return http.post("/tutorialareas", data);
  }

  update(id, data) {
    return http.put(`/tutorialareas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorialareas/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorialareas`);
  }

  findById_tutorial(id_tutorial) {
    return http.get(`/tutorialareas?id_tutorial=${id_tutorial}`);
  }
}

export default new TutorialareaDataService();