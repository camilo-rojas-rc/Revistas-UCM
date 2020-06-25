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
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
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
    const lastname1 = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        lastname1: lastname1
      }
    }));
  }

  onChangeLastname2(e) {
    const lastname2 = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        lastname2: lastname2
      }
    }));
  }

  onChangeOrganization(e) {
    const organization = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        organization: organization
      }
    }));
  }

  onChangeDepartment(e) {
    const department = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        department: department
      }
    }));
  }

  onChangeCountry(e) {
    const country = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        country: country
      }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        phone: phone
      }
    }));
  }

  onChangeBiography(e) {
    const biography = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        biography: biography
      }
    }));
  }

  onChangeCommentary(e) {
    const commentary = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        commentary: commentary
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
      name: this.state.currentUser.name,
      email: this.state.currentUser.email,
      password: this.state.currentUser.password,
      lastname1: this.state.currentUser.lastname1,
      lastname2: this.state.currentUser.lastname2,
      organization: this.state.currentUser.organization,
      department: this.state.currentUser.department,
      country: this.state.currentUser.country,
      phone: this.state.currentUser.phone,
      biography: this.state.currentUser.biography,
      commentary: this.state.currentUser.commentary,
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
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentUser.name}
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
                <label htmlFor="lastname1">Lastname1</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname1"
                  value={currentUser.lastname1}
                  onChange={this.onChangeLastname1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname2">Lastname2</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname2"
                  value={currentUser.lastname2}
                  onChange={this.onChangeLastname2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input
                  type="text"
                  className="form-control"
                  id="organization"
                  value={currentUser.organization}
                  onChange={this.onChangeOrganization}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentUser.department}
                  onChange={this.onChangeDepartment}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={currentUser.country}
                  onChange={this.onChangeCountry}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentUser.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="biography">Biography</label>
                <input
                  type="text"
                  className="form-control"
                  id="biography"
                  value={currentUser.biography}
                  onChange={this.onChangeBiography}
                />
              </div>
              <div className="form-group">
                <label htmlFor="commentary">Commentary</label>
                <input
                  type="text"
                  className="form-control"
                  id="commentary"
                  value={currentUser.commentary}
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