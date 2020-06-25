import React, { Component } from "react";
import AsignacionDataService from "../services/asignacion.service";

export default class Asignacion extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.getAsignacion = this.getAsignacion.bind(this);
    this.updateAsignacion = this.updateAsignacion.bind(this);
    this.deleteAsignacion = this.deleteAsignacion.bind(this);

    this.state = {
      currentAsignacion: {
        id: null,
        id_user: "",
        id_articulo: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAsignacion(this.props.match.params.id);
  }

  onChangeId_user(e) {
    const id_user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAsignacion: {
          ...prevState.currentAsignacion,
          id_user: id_user
        }
      };
    });
  }

  onChangeId_articulo(e) {
    const id_articulo = e.target.value;
    
    this.setState(prevState => ({
      currentAsignacion: {
        ...prevState.currentAsignacion,
        id_articulo: id_articulo
      }
    }));
  }

  onChangeEstado(e) {
    const estado = e.target.value;
    
    this.setState(prevState => ({
      currentAsignacion: {
        ...prevState.currentAsignacion,
        estado: estado
      }
    }));
  }

  getAsignacion(id) {
    AsignacionDataService.get(id)
      .then(response => {
        this.setState({
          currentAsignacion: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAsignacion() {
    AsignacionDataService.update(
      this.state.currentAsignacion.id,
      this.state.currentAsignacion
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Asignacion was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAsignacion() {    
    AsignacionDataService.delete(this.state.currentAsignacion.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/asignacions')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAsignacion } = this.state;

    return (
      <div>
        {currentAsignacion ? (
          <div className="edit-form">
            <h4>Asignacion</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id_user">Id_user</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_user"
                  value={currentAsignacion.id_user}
                  onChange={this.onChangeId_user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_articulo">Id_articulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_articulo"
                  value={currentAsignacion.id_articulo}
                  onChange={this.onChangeId_articulo}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAsignacion}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAsignacion}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Asignacion...</p>
          </div>
        )}
      </div>
    );
  }
}