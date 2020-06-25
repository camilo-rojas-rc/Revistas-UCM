import React, { Component } from "react";
import AsignacionDataService from "../services/asignacion.service";
import { Link } from "react-router-dom";

export default class AsignacionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEstado = this.onChangeSearchEstado.bind(this);
    this.retrieveAsignacions = this.retrieveAsignacions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAsignacion = this.setActiveAsignacion.bind(this);
    this.removeAllAsignacions = this.removeAllAsignacions.bind(this);
    this.searchEstado = this.searchEstado.bind(this);

    this.state = {
      asignacions: [],
      currentAsignacion: null,
      currentIndex: -1,
      searchEstado: ""
    };
  }

  componentDidMount() {
    this.retrieveAsignacions();
  }

  onChangeSearchEstado(e) {
    const searchEstado = e.target.value;

    this.setState({
      searchEstado: searchEstado
    });
  }

  retrieveAsignacions() {
    AsignacionDataService.getAll()
      .then(response => {
        this.setState({
          asignacions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAsignacions();
    this.setState({
      currentAsignacion: null,
      currentIndex: -1
    });
  }

  setActiveAsignacion(asignacion, index) {
    this.setState({
      currentAsignacion: asignacion,
      currentIndex: index
    });
  }

  removeAllAsignacions() {
    AsignacionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchEstado() {
    AsignacionDataService.findByEstado(this.state.searchEstado)
      .then(response => {
        this.setState({
          asignacions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchEstado, asignacions, currentAsignacion, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchEstado}
              onChange={this.onChangeSearchEstado}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchEstado}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Asignacions List</h4>

          <ul className="list-group">
            {asignacions &&
              asignacions.map((asignacion, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAsignacion(asignacion, index)}
                  key={index}
                >
                  {asignacion.id_user}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/asignacions/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentAsignacion ? (
            <div>
              <h4>Asignacion</h4>
              <div>
                <label>
                  <strong>Id_user:</strong>
                </label>{" "}
                {currentAsignacion.id_user}
              </div>
              <div>
                <label>
                  <strong>Id_user:</strong>
                </label>{" "}
                {currentAsignacion.id_user}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentAsignacion.estado}
              </div>

              <Link
                to={"/asignacions/" + currentAsignacion.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Asignacion...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}