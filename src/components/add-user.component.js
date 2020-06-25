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
        name: "",
        email: "",
        password: "",
        lastname1: "",
        lastname2: "",
        organization: "",
        department: "",
        country: "",
        phone: "",
        biography: "",
        commentary: "",
        role: "Autor",

        submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
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
      lastname1: e.target.value
    });
  }

  onChangeLastname2(e) {
    this.setState({
      lastname2: e.target.value
    });
  }

  onChangeOrganization(e) {
    this.setState({
      organization: e.target.value
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeBiography(e) {
    this.setState({
      biography: e.target.value
    });
  }

  onChangeCommentary(e) {
    this.setState({
      commentary: e.target.value
    });
  }

  saveUser() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      lastname1: this.state.lastname1,
      lastname2: this.state.lastname2,
      organization: this.state.organization,
      department: this.state.department,
      country: this.state.country,
      phone: this.state.phone,
      biography: this.state.biography,
      commentary: this.state.commentary
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          lastname1: response.data.lastname1,
          lastname2: response.data.lastname2,
          organization: response.data.organization,
          department: response.data.department,
          country: response.data.country,
          phone: response.data.phone,
          biography: response.data.biography,
          commentary: response.data.commentary,
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
       name: "",
       email: "",
       password: "",
       lastname1: "",
       lastname2: "",
       organization: "",
       department: "",
       country: "",
       phone: "",
       biography: "",
       commentary: "",
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
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
                name="email"
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
                name="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname1">Lastname1</label>
              <input
                type="text"
                className="form-control"
                id="lastname1"
                required
                value={this.state.lastname1}
                onChange={this.onChangeLastname1}
                name="lastname1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname2">Lastname2</label>
              <input
                type="text"
                className="form-control"
                id="lastname2"
                required
                value={this.state.lastname2}
                onChange={this.onChangeLastname2}
                name="lastname2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                className="form-control"
                id="organization"
                required
                value={this.state.organization}
                onChange={this.onChangeOrganization}
                name="organization"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                required
                value={this.state.department}
                onChange={this.onChangeDepartment}
                name="department"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                value={this.state.country}
                onChange={this.onChangeCountry}
                name="country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="biography">Biography</label>
              <input
                type="text"
                className="form-control"
                id="biography"
                required
                value={this.state.biography}
                onChange={this.onChangeBiography}
                name="biography"
              />
            </div>

            <div className="form-group">
              <label htmlFor="commentary">Commentary</label>
              <input
                type="text"
                className="form-control"
                id="commentary"
                required
                value={this.state.commentary}
                onChange={this.onChangeCommentary}
                name="commentary"
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