import React, { Component } from "react";
import ArticleDataService from "../services/article.service";

export default class AddArticle extends Component {
  constructor(props) {
    super(props);
    //declaracion de la funciones
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangeCommentary = this.onChangeCommentary.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    //declaracion de los strings que se usaran en las funciones
    this.estado = {
        id: null,
        titulo: "",
        estado: "",
        documento: "",
        comentario: "",
        descripcion: "",
        autores: "",
        publicado: false,

        submitted: false
    };
  }

  //las funciones onChange toman el valor pasado por un formulario y lo guardan en un string
  onChangeTitle(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      estado: e.target.value
    });
  }

  onChangeDocument(e) {
    this.setState({
      documento: e.target.value
    });
  }

  onChangeCommentary(e) {
    this.setState({
      comentario: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      descripcion: e.target.value
    });
  }

  onChangeAuthors(e) {
    this.setState({
      autores: e.target.value
    });
  }

  //funcion que guarda los datos en la bd
  saveArticle() {
    var data = {
      titulo: this.estado.titulo,
      estado: this.estado.estado,
      documento: this.estado.documento,
      comentario: this.estado.comentario,
      descripcion: this.estado.descripcion,
      autores: this.estado.autores
    };

    //se hace un llamada a la funcion create para crear una tabla con los valores pasados pr formulario
    ArticleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          estado: response.data.estado,
          documento: response.data.documento,
          comentario: response.data.comentario,
          descripcion: response.data.descripcion,
          autores: response.data.autores,
          publicado: response.data.publicado,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //crea una nueva tabla
  newArticle() {
    this.setState({
      id: null,
      titulo: "",
      estado: "",
      documento: "",
      comentario: "",
      descripcion: "",
      autores: "",
      publicado: false,

      submitted: false
    });
  }

  render() {
    return (
      //formulario para la creacion de un nuevo articulo
      <div className="submit-form">
        {this.estado.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="titulo">titulo</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                required
                value={this.estado.titulo}
                onChange={this.onChangeTitle}
                name="titulo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">estado</label>
              <input
                type="text"
                className="form-control"
                id="estado"
                required
                value={this.estado.estado}
                onChange={this.onChangeState}
                name="estado"
              />
            </div>

            <div className="form-group">
              <label htmlFor="documento">documento</label>
              <input
                type="text"
                className="form-control"
                id="documento"
                required
                value={this.estado.documento}
                onChange={this.onChangeDocument}
                name="documento"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comentario">comentario</label>
              <input
                type="text"
                className="form-control"
                id="comentario"
                required
                value={this.estado.comentario}
                onChange={this.onChangeCommentary}
                name="comentario"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={this.estado.descripcion}
                onChange={this.onChangeDescription}
                name="descripcion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="autores">autores</label>
              <input
                type="text"
                className="form-control"
                id="autores"
                required
                value={this.estado.autores}
                onChange={this.onChangeAuthors}
                name="autores"
              />
            </div>

            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}