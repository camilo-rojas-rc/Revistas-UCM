import React, { Component } from "react";
import SolicitarolDataService from "../services/solicitarol.service";
import { Link } from "react-router-dom";

export default class SolicitarolsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchComentario = this.onChangeSearchComentario.bind(this);
    this.retrieveSolicitarols = this.retrieveSolicitarols.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSolicitarol = this.setActiveSolicitarol.bind(this);
    this.removeAllSolicitarols = this.removeAllSolicitarols.bind(this);
    this.searchComentario = this.searchComentario.bind(this);

    this.state = {
      solicitarols: [],
      currentSolicitarol: null,
      currentIndex: -1,
      searchComentario: ""
    };
  }

  componentDidMount() {
    this.retrieveSolicitarols();
  }

  onChangeSearchComentario(e) {
    const searchComentario = e.target.value;

    this.setState({
      searchComentario: searchComentario
    });
  }

  retrieveSolicitarols() {
    SolicitarolDataService.getAll()
      .then(response => {
        this.setState({
          solicitarols: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSolicitarols();
    this.setState({
      currentSolicitarol: null,
      currentIndex: -1
    });
  }

  setActiveSolicitarol(solicitarol, index) {
    this.setState({
      currentSolicitarol: solicitarol,
      currentIndex: index
    });
  }

  removeAllSolicitarols() {
    SolicitarolDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchComentario() {
    SolicitarolDataService.findByComentario(this.state.searchComentario)
      .then(response => {
        this.setState({
          solicitarols: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchComentario, solicitarols, currentSolicitarol, currentIndex } = this.state;

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
          <h4>Solicita-rols List</h4>

          <ul className="list-group">
            {solicitarols &&
              solicitarols.map((solicitarol, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSolicitarol(solicitarol, index)}
                  key={index}
                >
                  {solicitarol.comentario}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/solicitarols/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentSolicitarol ? (
            <div>
              <h4>Solicita-rol</h4>
              <div>
                <label>
                  <strong>userId:</strong>
                </label>{" "}
                {currentSolicitarol.userId}
              </div>
              <div>
                <label>
                  <strong>Comentario:</strong>
                </label>{" "}
                {currentSolicitarol.comentario}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentSolicitarol.estado}
              </div>

              <Link
                to={"/solicitarols/" + currentSolicitarol.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Solicitarol...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}