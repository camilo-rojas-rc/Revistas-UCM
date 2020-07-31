import React, { Component } from "react";
import ArticleDataService from "../services/article.service";
import { Link } from "react-router-dom";

export default class ArticlesList extends Component {
  constructor(props) {
    super(props);
    //declaracion de la funciones
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.removeAllArticles = this.removeAllArticles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    //declaracion de los strings que se usaran en las funciones
    this.estado = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  //las funciones onChange toman el valor pasado por un formulario y lo guardan en un string
  //esta funcion guarda el valor para buscar e la tabla
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  //funcion que obtiene a todos los datos de una tabla
  retrieveArticles() {
    ArticleDataService.getAll() //llama a la funcion getall
      .then(response => {
        this.setState({
          articles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //una ves realizada la funcion retrieveArticles, esta refresca la lista de datos
  refreshList() {
    this.retrieveArticles();
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
  }

  //cuando se informacion en una tabla, esta funcion despues de obtener dicha informacion la guarda e un array
  setActiveArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index
    });
  }

  //elimina todos los datos de la tabla
  removeAllArticles() {
    ArticleDataService.deleteAll()//llama a la funcion deleteall
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  //funcion que busca un determinado dato en una tabla
  searchTitle() {
    ArticleDataService.findByTitle(this.estado.searchTitle)//llama a la funcion findByTitle
      .then(response => {
        this.setState({
          articles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, articles, currentArticle, currentIndex } = this.estado;

    return (
      //template que muestra todos los articulos
      //ademas cuando se seleciona un articulo, este muestra un resumen de este
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Articles List</h4>

          <ul className="list-group">
            {articles &&
              articles.map((article, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticle(article, index)}
                  key={index}
                >
                  {article.titulo}
                </li>
              ))}
          </ul>

          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/articles/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentArticle ? (
            <div>
              <h4>Article</h4>
              <div>
                <label>
                  <strong>titulo:</strong>
                </label>{" "}
                {currentArticle.titulo}
              </div>
              <div>
                <label>
                  <strong>estado:</strong>
                </label>{" "}
                {currentArticle.estado}
              </div>
              <div>
                <label>
                  <strong>documento:</strong>
                </label>{" "}
                {currentArticle.documento}
              </div>
              <div>
                <label>
                  <strong>comentario:</strong>
                </label>{" "}
                {currentArticle.comentario}
              </div>
              <div>
                <label>
                  <strong>descripcion:</strong>
                </label>{" "}
                {currentArticle.descripcion}
              </div>
              <div>
                <label>
                  <strong>autores:</strong>
                </label>{" "}
                {currentArticle.autores}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentArticle.publicado ? "publicado" : "Pending"}
              </div>

              <Link
                to={"/articles/" + currentArticle.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Article...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}