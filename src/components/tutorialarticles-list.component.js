import React, { Component } from "react";
import TutorialarticleDataService from "../services/tutorialarticle.service";
import { Link } from "react-router-dom";

export default class TutorialarticlesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId_tutorial = this.onChangeSearchId_tutorial.bind(this);
    this.retrieveTutorialarticles = this.retrieveTutorialarticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorialarticle = this.setActiveTutorialarticle.bind(this);
    this.removeAllTutorialarticles = this.removeAllTutorialarticles.bind(this);
    this.searchId_tutorial = this.searchId_tutorial.bind(this);

    this.state = {
      tutorialarticles: [],
      currentTutorialarticle: null,
      currentIndex: -1,
      searchId_tutorial: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorialarticles();
  }

  onChangeSearchId_tutorial(e) {
    const searchId_tutorial = e.target.value;

    this.setState({
      searchId_tutorial: searchId_tutorial
    });
  }

  retrieveTutorialarticles() {
    TutorialarticleDataService.getAll()
      .then(response => {
        this.setState({
          tutorialarticles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorialarticles();
    this.setState({
      currentTutorialarticle: null,
      currentIndex: -1
    });
  }

  setActiveTutorialarticle(tutorialarticle, index) {
    this.setState({
      currentTutorialarticle: tutorialarticle,
      currentIndex: index
    });
  }

  removeAllTutorialarticles() {
    TutorialarticleDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchId_tutorial() {
    TutorialarticleDataService.findById_tutorial(this.state.searchId_tutorial)
      .then(response => {
        this.setState({
          tutorialarticles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchId_tutorial, tutorialarticles, currentTutorialarticle, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchId_tutorial}
              onChange={this.onChangeSearchId_tutorial}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchId_tutorial}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Revista-articles List</h4>

          <ul className="list-group">
            {tutorialarticles &&
              tutorialarticles.map((tutorialarticle, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorialarticle(tutorialarticle, index)}
                  key={index}
                >
                  {tutorialarticle.revistaId}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/tutorialarticles/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorialarticle ? (
            <div>
              <h4>Revista-article</h4>
              <div>
                <label>
                  <strong>revistaId:</strong>
                </label>{" "}
                {currentTutorialarticle.revistaId}
              </div>
              <div>
                <label>
                  <strong>articuloId:</strong>
                </label>{" "}
                {currentTutorialarticle.articuloId}
              </div>

              <Link
                to={"/tutorialarticles/" + currentTutorialarticle.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Revista-article...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}