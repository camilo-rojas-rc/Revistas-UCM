import React, { Component } from "react";
import AreaDataService from "../services/area.service";

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getArea = this.getArea.bind(this);
    this.updateArea = this.updateArea.bind(this);
    this.deleteArea = this.deleteArea.bind(this);

    this.state = {
      currentArea: {
        id: null,
        name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArea(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArea: {
          ...prevState.currentArea,
          name: name
        }
      };
    });
  }

  getArea(id) {
    AreaDataService.get(id)
      .then(response => {
        this.setState({
          currentArea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArea() {
    AreaDataService.update(
      this.state.currentArea.id,
      this.state.currentArea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Area was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArea() {    
    AreaDataService.delete(this.state.currentArea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/areas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArea } = this.state;

    return (
      <div>
        {currentArea ? (
          <div className="edit-form">
            <h4>Area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentArea.name}
                  onChange={this.onChangeName}
                />
              </div>
              
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Area...</p>
          </div>
        )}
      </div>
    );
  }
}