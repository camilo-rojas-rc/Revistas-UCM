import React, { Component } from "react";
import ArticleDataService from "../services/article.service";

export default class AddArticle extends Component {
  constructor(props) {
    super(props);
    //declaracion de la funciones
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangeCommentary = this.onChangeCommentary.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    //declaracion de los strings que se usaran en las funciones
    this.state = {
      id: null,
      id_user: "",
      title: "",
      state: "",
      document: "",
      commentary: "",
      description: "",
      authors: "",
      published: false,

      submitted: false
    };
  }

  onChangeId_user(e) {
    this.setState({
      id_user: e.target.value
    });
  }

  //las funciones onChange toman el valor pasado por un formulario y lo guardan en un string
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangeDocument(e) {
    this.setState({
      document: e.target.value
    });
  }

  onChangeCommentary(e) {
    this.setState({
      commentary: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAuthors(e) {
    this.setState({
      authors: e.target.value
    });
  }

  //funcion que guarda los datos en la bd
  saveArticle() {
    var data = {
      id_user: this.props.match.params.id,
      title: this.state.title,
      state: this.state.state,
      document: this.state.document,
      commentary: this.state.commentary,
      description: this.state.description,
      authors: this.state.authors
    };

    //se hace un llamada a la funcion create para crear una tabla con los valores pasados pr formulario
    ArticleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_user: this.props.match.params.id,
          title: response.data.title,
          state: response.data.state,
          document: response.data.document,
          commentary: response.data.commentary,
          description: response.data.description,
          authors: response.data.authors,
          published: response.data.published,

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
      id_user: "",
      title: "",
      state: "",
      document: "",
      commentary: "",
      description: "",
      authors: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      //formulario para la creacion de un nuevo articulo
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="id_user">id_user</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_user"
                  required
                  value={this.props.match.params.id}
                  onChange={this.onChangeId_user}
                  name="id_user"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">state</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  required
                  value={this.state.state}
                  onChange={this.onChangeState}
                  name="state"
                />
              </div>

              <div className="form-group">
                <label htmlFor="document">document</label>
                <input
                  type="text"
                  className="form-control"
                  id="document"
                  required
                  value={this.state.document}
                  onChange={this.onChangeDocument}
                  name="document"
                />
              </div>

              <div className="form-group">
                <label htmlFor="commentary">commentary</label>
                <input
                  type="text"
                  className="form-control"
                  id="commentary"
                  required
                  value={this.state.commentary}
                  onChange={this.onChangeCommentary}
                  name="commentary"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="authors">authors</label>
                <input
                  type="text"
                  className="form-control"
                  id="authors"
                  required
                  value={this.state.authors}
                  onChange={this.onChangeAuthors}
                  name="authors"
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