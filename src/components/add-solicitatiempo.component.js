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
      id_user: "",
      id_articulo: "", 
      dias: "",
      comentario: "",

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
        id_user: this.state.id_user,
        id_articulo: this.state.id_articulo,
        dias: this.state.dias,
        comentario: this.state.comentario
    };

    SolicitatiempoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_user: response.data.id_user,
          id_articulo: response.data.id_articulo,
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
      id_user: "",
      id_articulo: "", 
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