import React, { Component } from "react";
import SolicitatiempoDataService from "../services/solicitatiempo.service";

export default class AddSolicitatiempo extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeDias = this.onChangeDias.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.saveSolicitatiempo = this.saveSolicitatiempo.bind(this);
    this.newSolicitatiempo = this.newSolicitatiempo.bind(this);

    this.state = {
      id: null,
      userId: "",
      articleId: "", 
      dias: "",
      comentario: "",

      submitted: false
    };
  }

  onChangeId_user(e) {
    this.setState({
        userId: e.target.value
    });
  }

  onChangeId_articulo(e) {
    this.setState({
        articleId: e.target.value
    });
  }

  onChangeDias(e) {
    this.setState({
        dias: e.target.value
    });
  }

  onChangeComentario(e) {
    this.setState({
        comentario: e.target.value
    });
  }

  saveSolicitatiempo() {
    var data = {
        userId: this.state.userId,
        articleId: this.state.articleId,
        dias: this.state.dias,
        comentario: this.state.comentario
    };

    SolicitatiempoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          userId: response.data.userId,
          articleId: response.data.articleId,
          dias: response.data.dias,
          comentario: response.data.comentario,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSolicitatiempo() {
    this.setState({
      id: null,
      userId: "",
      articleId: "", 
      dias: "",
      comentario: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="userId">userId</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                required
                value={this.state.userId}
                onChange={this.onChangeId_user}
                name="userId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="articleId">articleId</label>
              <input
                type="text"
                className="form-control"
                id="articleId"
                required
                value={this.state.articleId}
                onChange={this.onChangeId_articulo}
                name="articleId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dias">Dias</label>
              <input
                type="text"
                className="form-control"
                id="dias"
                required
                value={this.state.dias}
                onChange={this.onChangeDias}
                name="dias"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <input
                type="text"
                className="form-control"
                id="comentario"
                required
                value={this.state.comentario}
                onChange={this.onChangeComentario}
                name="comentario"
              />
            </div>

            <button onClick={this.saveSolicitatiempo} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}