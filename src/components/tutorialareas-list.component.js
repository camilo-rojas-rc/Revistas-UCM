import React, { Component } from "react";
import TutorialareaDataService from "../services/tutorialarea.service";
import { Link } from "react-router-dom";

export default class TutorialareasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId_tutorial = this.onChangeSearchId_tutorial.bind(this);
    this.retrieveTutorialareas = this.retrieveTutorialareas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorialarea = this.setActiveTutorialarea.bind(this);
    this.removeAllTutorialareas = this.removeAllTutorialareas.bind(this);
    this.searchId_tutorial = this.searchId_tutorial.bind(this);

    this.state = {
        tutorialareas: [],
        currentTutorialarea: null,
        currentIndex: -1,
        searchId_tutorial: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorialareas();
  }

  onChangeSearchId_tutorial(e) {
    const searchId_tutorial = e.target.value;

    this.setState({
      searchId_tutorial: searchId_tutorial
    });
  }

  retrieveTutorialareas() {
    TutorialareaDataService.getAll()
      .then(response => {
        this.setState({
          tutorialareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorialareas();
    this.setState({
      currentTutorialarea: null,
      currentIndex: -1
    });
  }

  setActiveTutorialarea(tutorialarea, index) {
    this.setState({
      currentTutorialarea: tutorialarea,
      currentIndex: index
    });
  }

  removeAllTutorialareas() {
    TutorialareaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchId_tutorial() {
    TutorialareaDataService.findById_tutorial(this.state.searchId_tutorial)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchId_tutorial, tutorialareas, currentTutorialarea, currentIndex } = this.state;

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
          <h4>Tutorial-areas List</h4>

          <ul className="list-group">
            {tutorialareas &&
              tutorialareas.map((tutorialarea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorialarea(tutorialarea, index)}
                  key={index}
                >
                  {tutorialarea.id_tutorial}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/tutorialareas/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorialarea ? (
            <div>
              <h4>Tutorial-area</h4>
              <div>
                <label>
                  <strong>Id_tutorial:</strong>
                </label>{" "}
                {currentTutorialarea.id_tutorial}
              </div>
              <div>
                <label>
                  <strong>Id_area:</strong>
                </label>{" "}
                {currentTutorialarea.id_area}
              </div>

              <Link
                to={"/tutorialareas/" + currentTutorialarea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorialarea...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}