import React, { Component } from "react";
import RoleService from "../services/solicitarol.service";

export default class Solicitarol extends Component {
  constructor(props) {
    super(props);
    this.getSolicitarol = this.getSolicitarol.bind(this);
    this.updateSolicitarol = this.updateSolicitarol.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSolicitarol = this.setActiveSolicitarol.bind(this);

    this.state = {
      solicitarols: [],
      currentSolicitarol: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.getSolicitarol(this.props.match.params.id);
  }

  getSolicitarol(id) {
    RoleService.get(id)
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

  updateSolicitarol(status) {
    var data = {
      id: this.state.currentSolicitarol.id,
      roles: status,
      username: this.state.currentSolicitarol.username,
      email: this.state.currentSolicitarol.email,
      password: this.state.currentSolicitarol.password
    };

    //se hace un llamada a la funcion update para crear una tabla con los valores pasados pr formulario
    RoleService.update(this.state.currentSolicitarol.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSolicitarol: {
            ...prevState.currentSolicitarol,
            roles: status
          }
        }));
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

  render() {
    const { solicitarols, currentSolicitarol, currentIndex } = this.state;

    return (
      <div className="list row">
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
                  {solicitarol.username}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentSolicitarol ? (
            <div>
              <h4>Solicita-rol</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentSolicitarol.id}
              </div>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentSolicitarol.username}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentSolicitarol.email}
              </div>
              <div>
                <label>
                  <strong>PassWord:</strong>
                </label>{" "}
                {currentSolicitarol.password}
              </div>
              <div>
                <label>
                  <strong>Role:</strong>
                </label>{" "}
                {currentSolicitarol.roles ? "5f2388f633e09f1128a76e02" : "5f2388f633e09f1128a76e03"}
              </div>

              {currentSolicitarol.roles ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateSolicitarol(false)}
              >
                Autor
              </button>
            ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateSolicitarol(true)}
                >
                  Revisor
                </button>
              )}
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