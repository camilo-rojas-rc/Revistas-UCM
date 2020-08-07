import React, { Component } from "react";
import SolicitarolDataService from "../services/solicitarol.service";

export default class AddSolicitarol extends Component {
  constructor(props) {
    super(props);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.saveSolicitarol = this.saveSolicitarol.bind(this);
    this.newSolicitarol = this.newSolicitarol.bind(this);

    this.state = {
      id: null,
      id_user: "",
      comentario: "",
      estado: false,

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

  saveSolicitarol() {
    var data = {
      id_user: this.props.match.params.id,
      comentario: this.state.comentario
    };

    SolicitarolDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_user: this.props.match.params.id,
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
      estado: false,

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
              <h3>
                <strong>Solicitud para Revisor</strong>
              </h3>
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

              <button onClick={this.saveSolicitarol} className="btn btn-success">
                Submit
            </button>
            </div>
          )}
      </div>
    );
  }
}