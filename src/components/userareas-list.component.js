import React, { Component } from "react";
import UserareaDataService from "../services/userarea.service";
import { Link } from "react-router-dom";

export default class UserareasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId_user = this.onChangeSearchId_user.bind(this);
    this.retrieveUserareas = this.retrieveUserareas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUserarea = this.setActiveUserarea.bind(this);
    this.removeAllUserareas = this.removeAllUserareas.bind(this);
    this.searchId_user = this.searchId_user.bind(this);

    this.state = {
      userareas: [],
      currentUserarea: null,
      currentIndex: -1,
      searchId_user: ""
    };
  }

  componentDidMount() {
    this.retrieveUserareas();
  }

  onChangeSearchId_user(e) {
    const searchId_user = e.target.value;

    this.setState({
      searchId_user: searchId_user
    });
  }

  retrieveUserareas() {
    UserareaDataService.getAll()
      .then(response => {
        this.setState({
          userareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUserareas();
    this.setState({
      currentUserarea: null,
      currentIndex: -1
    });
  }

  setActiveUserarea(userarea, index) {
    this.setState({
      currentUserarea: userarea,
      currentIndex: index
    });
  }

  removeAllUserareas() {
    UserareaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchId_user() {
    UserareaDataService.findById_user(this.state.searchId_user)
      .then(response => {
        this.setState({
          userareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchId_user, userareas, currentUserarea, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchId_user}
              onChange={this.onChangeSearchId_user}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchId_user}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>User-areas List</h4>

          <ul className="list-group">
            {userareas &&
              userareas.map((userarea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUserarea(userarea, index)}
                  key={index}
                >
                  {userarea.id_user}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/userareas/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentUserarea ? (
            <div>
              <h4>User-area</h4>
              <div>
                <label>
                  <strong>Id_user:</strong>
                </label>{" "}
                {currentUserarea.id_user}
              </div>
              <div>
                <label>
                  <strong>Id_area:</strong>
                </label>{" "}
                {currentUserarea.id_area}
              </div>

              <Link
                to={"/userareas/" + currentUserarea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Userarea...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}