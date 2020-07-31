import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
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
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
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

        submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeLastname1(e) {
    this.setState({
      apellido1: e.target.value
    });
  }

  onChangeLastname2(e) {
    this.setState({
      apellido2: e.target.value
    });
  }

  onChangeOrganization(e) {
    this.setState({
      organizacion: e.target.value
    });
  }

  onChangeDepartment(e) {
    this.setState({
      departamento: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      pais: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      telefono: e.target.value
    });
  }

  onChangeBiography(e) {
    this.setState({
      biografia: e.target.value
    });
  }

  onChangeCommentary(e) {
    this.setState({
      comentario: e.target.value
    });
  }

  saveUser() {
    var data = {
      nombre: this.state.nombre,
      email: this.state.email,
      password: this.state.password,
      apellido1: this.state.apellido1,
      apellido2: this.state.apellido2,
      organizacion: this.state.organizacion,
      departamento: this.state.departamento,
      pais: this.state.pais,
      telefono: this.state.telefono,
      biografia: this.state.biografia,
      comentario: this.state.comentario
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          email: response.data.email,
          password: response.data.password,
          apellido1: response.data.apellido1,
          apellido2: response.data.apellido2,
          organizacion: response.data.organizacion,
          departamento: response.data.departamento,
          pais: response.data.pais,
          telefono: response.data.telefono,
          biografia: response.data.biografia,
          comentario: response.data.comentario,
          role: response.data.role,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
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
              <label htmlFor="nombre">nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeName}
                nombre="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                nombre="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                nombre="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido1">apellido1</label>
              <input
                type="text"
                className="form-control"
                id="apellido1"
                required
                value={this.state.apellido1}
                onChange={this.onChangeLastname1}
                nombre="apellido1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido2">apellido2</label>
              <input
                type="text"
                className="form-control"
                id="apellido2"
                required
                value={this.state.apellido2}
                onChange={this.onChangeLastname2}
                nombre="apellido2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizacion">organizacion</label>
              <input
                type="text"
                className="form-control"
                id="organizacion"
                required
                value={this.state.organizacion}
                onChange={this.onChangeOrganization}
                nombre="organizacion"
              />
            </div>

            <div className="form-group">
              <label htmlFor="departamento">departamento</label>
              <input
                type="text"
                className="form-control"
                id="departamento"
                required
                value={this.state.departamento}
                onChange={this.onChangeDepartment}
                nombre="departamento"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pais">pais</label>
              <input
                type="text"
                className="form-control"
                id="pais"
                required
                value={this.state.pais}
                onChange={this.onChangeCountry}
                nombre="pais"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">telefono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                required
                value={this.state.telefono}
                onChange={this.onChangePhone}
                nombre="telefono"
              />
            </div>

            <div className="form-group">
              <label htmlFor="biografia">biografia</label>
              <input
                type="text"
                className="form-control"
                id="biografia"
                required
                value={this.state.biografia}
                onChange={this.onChangeBiography}
                nombre="biografia"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comentario">comentario</label>
              <input
                type="text"
                className="form-control"
                id="comentario"
                required
                value={this.state.comentario}
                onChange={this.onChangeCommentary}
                nombre="comentario"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}