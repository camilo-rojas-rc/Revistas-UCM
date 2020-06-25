import React, { Component } from "react";
import SolicitarolDataService from "../services/solicitarol.service";

export default class Solicitarol extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.getSolicitarol = this.getSolicitarol.bind(this);
    this.updateSolicitarol = this.updateSolicitarol.bind(this);
    this.deleteSolicitarol = this.deleteSolicitarol.bind(this);

    this.state = {
      currentSolicitarol: {
        id: null,
        id_user: "",
        comentario: "",
        estado: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSolicitarol(this.props.match.params.id);
  }

  onChangeId_user(e) {
    const id_user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSolicitarol: {
          ...prevState.currentSolicitarol,
          id_user: id_user
        }
      };
    });
  }

  onChangeComentario(e) {
    const comentario = e.target.value;
    
    this.setState(prevState => ({
      currentSolicitarol: {
        ...prevState.currentSolicitarol,
        comentario: comentario
      }
    }));
  }

  onChangeEstado(e) {
    const estado = e.target.value;
    
    this.setState(prevState => ({
      currentSolicitarol: {
        ...prevState.currentSolicitarol,
        estado: estado
      }
    }));
  }

  getSolicitarol(id) {
    SolicitarolDataService.get(id)
      .then(response => {
        this.setState({
          currentSolicitarol: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSolicitarol() {
    SolicitarolDataService.update(
      this.state.currentSolicitarol.id,
      this.state.currentSolicitarol
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Solicitarol was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSolicitarol() {    
    SolicitarolDataService.delete(this.state.currentSolicitarol.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/solicitarols')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSolicitarol } = this.state;

    return (
      <div>
        {currentSolicitarol ? (
          <div className="edit-form">
            <h4>Solicita-rol</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id_user">Id_user</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_user"
                  value={currentSolicitarol.id_user}
                  onChange={this.onChangeId_user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">Comentario</label>
                <input
                  type="text"
                  className="form-control"
                  id="comentario"
                  value={currentSolicitarol.comentario}
                  onChange={this.onChangeComentario}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  value={currentSolicitarol.estado}
                  onChange={this.onChangeEstado}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSolicitarol}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSolicitarol}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Solicitarol...</p>
          </div>
        )}
      </div>
    );
  }
}