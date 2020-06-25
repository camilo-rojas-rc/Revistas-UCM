import React, { Component } from "react";
import SolicitarolDataService from "../services/solicitarol.service";

export default class AddSolicitarol extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.saveSolicitarol = this.saveSolicitarol.bind(this);
    this.newSolicitarol = this.newSolicitarol.bind(this);

    this.state = {
      id: null,
      id_user: "",
      comentario: "", 
      estado: "",

      submitted: false
    };
  }

  onChangeId_user(e) {
    this.setState({
        id_user: e.target.value
    });
  }

  onChangeComentario(e) {
    this.setState({
        comentario: e.target.value
    });
  }

  onChangeEstado(e) {
    this.setState({
        estado: e.target.value
    });
  }

  saveSolicitarol() {
    var data = {
        id_user: this.state.id_user,
        comentario: this.state.comentario,
        estado: this.state.estado
    };

    SolicitarolDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_user: response.data.id_user,
          comentario: response.data.comentario,
          estado: response.data.estado,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSolicitarol() {
    this.setState({
      id: null,
      id_user: "",
      comentario: "",
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

            <button onClick={this.saveSolicitarol} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}