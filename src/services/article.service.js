import http from "../http-common";
//se importa el archvo js que consume la api

class ArticleDataService {
  //funciones de get, post, put y delete con sus respectivas direcciones en el url de la api
  getAll() {
    return http.get("/articles");
  }

  get(id) {
    return http.get(`/articles/${id}`);
  }

  create(data) {
    return http.post("/articles", data);
  }

  update(id, data) {
    return http.put(`/articles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/articles/${id}`);
  }

  deleteAll() {
    return http.delete(`/articles`);
  }

  findByTitle(title) {
    return http.get(`/articles?title=${title}`);
  }
}

export default new ArticleDataService();