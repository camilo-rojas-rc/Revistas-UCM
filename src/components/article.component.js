import React, { Component } from "react";
import ArticleDataService from "../services/article.service";

export default class Article extends Component {
  constructor(props) {
    super(props);
    //declaracion de la funciones
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangeCommentary = this.onChangeCommentary.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    //declaracion de los strings que se usaran en las funciones
    this.estado = {
      currentArticle: {
        id: null,
        titulo: "",
        estado: "",
        documento: "",
        comentario: "",
        descripcion: "",
        autores: "",
        publicado: false,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  //las funciones onChange toman el valor pasado por un formulario y lo guardan en un string
  onChangeTitle(e) {
    const titulo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          titulo: titulo
        }
      };
    });
  }

  onChangeState(e) {
    const estado = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        estado: estado
      }
    }));
  }

  onChangeDocument(e) {
    const documento = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        documento: documento
      }
    }));
  }

  onChangeCommentary(e) {
    const comentario = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        comentario: comentario
      }
    }));
  }

  onChangeDescription(e) {
    const descripcion = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        descripcion: descripcion
      }
    }));
  }

  onChangeAuthors(e) {
    const autores = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        autores: autores
      }
    }));
  }

  //funcion que obtiene a traves de una id
  getArticle(id) {
    ArticleDataService.get(id) //llamar a la funcion get
      .then(response => {
        this.setState({
          currentArticle: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //funcion que actualiza un atributo en la tabla
  updatePublished(status) {
    var data = {
      id: this.estado.currentArticle.id,
      titulo: this.estado.currentArticle.titulo,
      estado: this.estado.currentArticle.estado,
      documento: this.estado.currentArticle.documento,
      comentario: this.estado.currentArticle.comentario,
      descripcion: this.estado.currentArticle.descripcion,
      autores: this.estado.currentArticle.autores,
      publicado: status
    };

    //se hace un llamada a la funcion update para crear una tabla con los valores pasados pr formulario
    ArticleDataService.update(this.estado.currentArticle.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentArticle: {
            ...prevState.currentArticle,
            publicado: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //funcion que actualiza los datos de la tabla
  updateArticle() {
    ArticleDataService.update( 
      this.estado.currentArticle.id,
      this.estado.currentArticle
    ) //llamar a la funcion update
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The article was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  //funcion que elimina una tabla
  deleteArticle() {    
    ArticleDataService.delete(this.estado.currentArticle.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/articles')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArticle } = this.estado;

    return (
      //formulario para actualizar los datos de la tabla articulo
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="titulo">titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={currentArticle.titulo}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">estado</label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  value={currentArticle.estado}
                  onChange={this.onChangeState}
                />
              </div>
              <div className="form-group">
                <label htmlFor="documento">documento</label>
                <input
                  type="text"
                  className="form-control"
                  id="documento"
                  value={currentArticle.documento}
                  onChange={this.onChangeDocument}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">comentario</label>
                <input
                  type="text"
                  className="form-control"
                  id="comentario"
                  value={currentArticle.comentario}
                  onChange={this.onChangeCommentary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={currentArticle.descripcion}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="autores">autores</label>
                <input
                  type="text"
                  className="form-control"
                  id="autores"
                  value={currentArticle.autores}
                  onChange={this.onChangeAuthors}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArticle.publicado ? "publicado" : "Pending"}
              </div>
            </form>

            {currentArticle.publicado ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArticle}
            >
              Update
            </button>
            <p>{this.estado.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Article...</p>
          </div>
        )}
      </div>
    );
  }
}