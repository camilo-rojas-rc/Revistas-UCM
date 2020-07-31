import React, { Component } from "react";
import AsignacionDataService from "../services/asignacion.service";

export default class AddAsignacion extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.saveAsignacion = this.saveAsignacion.bind(this);
    this.newAsignacion = this.newAsignacion.bind(this);

    this.state = {
      id: null,
      userId: "",
      articleId: "", 
      estado: "",

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

  onChangeEstado(e) {
    this.setState({
        estado: e.target.value
    });
  }

  saveAsignacion() {
    var data = {
      userId: this.state.userId,
      articleId: this.state.articleId, 
      estado: this.state.estado,
    };

    AsignacionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          userId: response.data.userId,
          articleId: response.data.articleId,
          estado: response.data.estado,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAsignacion() {
    this.setState({
      id: null,
      userId: "",
      articleId: "", 
      estado: "",

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
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                className="form-control"
                id="estado"
                required
                value={this.state.estado}
                onChange={this.onChangeEstado}
                name="estado"
              />
            </div>

            <button onClick={this.saveAsignacion} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}