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
      id_user: "",
      id_articulo: "", 
      estado: "",

      submitted: false
    };
  }

  onChangeId_user(e) {
    this.setState({
        id_user: e.target.value
    });
  }

  onChangeId_articulo(e) {
    this.setState({
        id_articulo: e.target.value
    });
  }

  onChangeEstado(e) {
    this.setState({
        estado: e.target.value
    });
  }

  saveAsignacion() {
    var data = {
      id_user: this.state.id_user,
      id_articulo: this.state.id_articulo, 
      estado: this.state.estado,
    };

    AsignacionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_user: response.data.id_user,
          id_articulo: response.data.id_articulo,
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
      id_user: "",
      id_articulo: "", 
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
              <label htmlFor="id_user">Id_user</label>
              <input
                type="text"
                className="form-control"
                id="id_user"
                required
                value={this.state.id_user}
                onChange={this.onChangeId_user}
                name="id_user"
              />
            </div>

            <div className="form-group">
              <label htmlFor="id_articulo">Id_articulo</label>
              <input
                type="text"
                className="form-control"
                id="id_articulo"
                required
                value={this.state.id_articulo}
                onChange={this.onChangeId_articulo}
                name="id_articulo"
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