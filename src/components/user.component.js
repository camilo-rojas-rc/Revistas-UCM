import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLastname1 = this.onChangeLastname1.bind(this);
    this.onChangeLastname2 = this.onChangeLastname2.bind(this);
    this.onChangeOrganization = this.onChangeOrganization.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBiography = this.onChangeBiography.bind(this);
    this.onChangeCommentary = this.onChangeCommentary.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        nombre: "",
        email: "",
        password: "",
        apellido1: "",
        apellido2: "",
        organizacion: "",
        departamento: "",
        pais: "",
        telefono: "",
        biografia: "",
        comentario: "",
        role: "Autor",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          nombre: nombre
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        password: password
      }
    }));
  }

  onChangeLastname1(e) {
    const apellido1 = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        apellido1: apellido1
      }
    }));
  }

  onChangeLastname2(e) {
    const apellido2 = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        apellido2: apellido2
      }
    }));
  }

  onChangeOrganization(e) {
    const organizacion = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        organizacion: organizacion
      }
    }));
  }

  onChangeDepartment(e) {
    const departamento = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        departamento: departamento
      }
    }));
  }

  onChangeCountry(e) {
    const pais = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        pais: pais
      }
    }));
  }

  onChangePhone(e) {
    const telefono = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        telefono: telefono
      }
    }));
  }

  onChangeBiography(e) {
    const biografia = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        biografia: biografia
      }
    }));
  }

  onChangeCommentary(e) {
    const comentario = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        comentario: comentario
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRole(status) {
    var data = {
      id: this.state.currentUser.id,
      nombre: this.state.currentUser.nombre,
      email: this.state.currentUser.email,
      password: this.state.currentUser.password,
      apellido1: this.state.currentUser.apellido1,
      apellido2: this.state.currentUser.apellido2,
      organizacion: this.state.currentUser.organizacion,
      departamento: this.state.currentUser.departamento,
      pais: this.state.currentUser.pais,
      telefono: this.state.currentUser.telefono,
      biografia: this.state.currentUser.biografia,
      comentario: this.state.currentUser.comentario,
      role: status
    };

    UserDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            role: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentUser.nombre}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido1">apellido1</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido1"
                  value={currentUser.apellido1}
                  onChange={this.onChangeLastname1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido2">apellido2</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido2"
                  value={currentUser.apellido2}
                  onChange={this.onChangeLastname2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="organizacion">organizacion</label>
                <input
                  type="text"
                  className="form-control"
                  id="organizacion"
                  value={currentUser.organizacion}
                  onChange={this.onChangeOrganization}
                />
              </div>
              <div className="form-group">
                <label htmlFor="departamento">departamento</label>
                <input
                  type="text"
                  className="form-control"
                  id="departamento"
                  value={currentUser.departamento}
                  onChange={this.onChangeDepartment}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pais">pais</label>
                <input
                  type="text"
                  className="form-control"
                  id="pais"
                  value={currentUser.pais}
                  onChange={this.onChangeCountry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  value={currentUser.telefono}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="biografia">biografia</label>
                <input
                  type="text"
                  className="form-control"
                  id="biografia"
                  value={currentUser.biografia}
                  onChange={this.onChangeBiography}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">comentario</label>
                <input
                  type="text"
                  className="form-control"
                  id="comentario"
                  value={currentUser.comentario}
                  onChange={this.onChangeCommentary}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.role ? "Author" : "Reviewer"}
              </div>
            </form>

            {currentUser.role ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateRole(false)}
              >
                Author
              </button>
            ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateRole(true)}
                >
                  Reviewer
                </button>
              )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
      </div>
    );
  }
}