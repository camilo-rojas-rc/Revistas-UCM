import http from "../http-common";

class TutorialarticleDataService {
  getAll() {
    return http.get("/tutorialarticles");
  }

  get(id) {
    return http.get(`/tutorialarticles/${id}`);
  }

  getAllrevistas() {
    return http.get("/tutorials");
  }

  getAllarticulo() {
    return http.get("/articles");
  }

  create(data) {
    return http.post("/tutorialarticles", data);
  }

  update(id, data) {
    return http.put(`/tutorialarticles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorialarticles/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorialarticles`);
  }

  findById_tutorial(id_tutorial) {
    return http.get(`/tutorialarticles?id_tutorial=${id_tutorial}`);
  }
}

export default new TutorialarticleDataService();