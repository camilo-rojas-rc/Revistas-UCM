import React, { Component } from "react";
import AreaDataService from "../services/area.service";
import { Link } from "react-router-dom";

export default class AreasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAreas = this.retrieveAreas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArea = this.setActiveArea.bind(this);
    this.removeAllAreas = this.removeAllAreas.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      areas: [],
      currentAreas: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveAreas();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveAreas() {
     AreaDataService.getAll()
      .then(response => {
        this.setState({
          areas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAreas();
    this.setState({
      currentArea: null,
      currentIndex: -1
    });
  }

  setActiveArea(area, index) {
    this.setState({
      currentArea: area,
      currentIndex: index
    });
  }

  removeAllAreas() {
    AreaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    AreaDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
            areas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, areas, currentArea, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Areas List</h4>

          <ul className="list-group">
            {areas &&
              areas.map((area, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArea(area, index)}
                  key={index}
                >
                  {area.name}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/areas/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentArea ? (
            <div>
              <h4>Area</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentArea.name}
              </div>

              <Link
                to={"/areas/" + currentArea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Area...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}