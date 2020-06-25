import http from "../http-common";

class ArticleareaDataService {
  getAll() {
    return http.get("/articleareas");
  }

  get(id) {
    return http.get(`/articleareas/${id}`);
  }

  create(data) {
    return http.post("/articleareas", data);
  }

  update(id, data) {
    return http.put(`/articleareas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/articleareas/${id}`);
  }

  deleteAll() {
    return http.delete(`/articleareas`);
  }

  findById_articulo(id_articulo) {
    return http.get(`/articleareas?id_articulo=${id_articulo}`);
  }
}

export default new ArticleareaDataService();