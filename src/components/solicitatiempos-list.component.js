import React, { Component } from "react";
import SolicitatiempoDataService from "../services/solicitatiempo.service";
import { Link } from "react-router-dom";

export default class SolicitatiemposList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchComentario = this.onChangeSearchComentario.bind(this);
    this.retrieveSolicitatiempos = this.retrieveSolicitatiempos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSolicitatiempo = this.setActiveSolicitatiempo.bind(this);
    this.removeAllSolicitatiempos = this.removeAllSolicitatiempos.bind(this);
    this.searchComentario = this.searchComentario.bind(this);

    this.state = {
      solicitatiempos: [],
      currentSolicitatiempo: null,
      currentIndex: -1,
      searchComentario: ""
    };
  }

  componentDidMount() {
    this.retrieveSolicitatiempos();
  }

  onChangeSearchComentario(e) {
    const searchComentario = e.target.value;

    this.setState({
      searchComentario: searchComentario
    });
  }

  retrieveSolicitatiempos() {
    SolicitatiempoDataService.getAll()
      .then(response => {
        this.setState({
          solicitatiempos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSolicitatiempos();
    this.setState({
      currentSolicitatiempo: null,
      currentIndex: -1
    });
  }

  setActiveSolicitatiempo(solicitatiempo, index) {
    this.setState({
      currentSolicitatiempo: solicitatiempo,
      currentIndex: index
    });
  }

  removeAllSolicitatiempos() {
    SolicitatiempoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchComentario() {
    SolicitatiempoDataService.findByComentario(this.state.searchComentario)
      .then(response => {
        this.setState({
          solicitatiempos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchComentario, solicitatiempos, currentSolicitatiempo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchComentario}
              onChange={this.onChangeSearchComentario}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchComentario}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Solicita-tiempos List</h4>

          <ul className="list-group">
            {solicitatiempos &&
              solicitatiempos.map((solicitatiempo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSolicitatiempo(solicitatiempo, index)}
                  key={index}
                >
                  {solicitatiempo.comentario}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/solicitatiempos/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentSolicitatiempo ? (
            <div>
              <h4>Solicita-tiempo</h4>
              <div>
                <label>
                  <strong>Id_user:</strong>
                </label>{" "}
                {currentSolicitatiempo.id_user}
              </div>
              <div>
                <label>
                  <strong>Id_articulo:</strong>
                </label>{" "}
                {currentSolicitatiempo.id_articulo}
              </div>
              <div>
                <label>
                  <strong>Dias:</strong>
                </label>{" "}
                {currentSolicitatiempo.dias}
              </div>
              <div>
                <label>
                  <strong>Comentario:</strong>
                </label>{" "}
                {currentSolicitatiempo.comentario}
              </div>

              <Link
                to={"/solicitatiempos/" + currentSolicitatiempo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Solicitatiempo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}