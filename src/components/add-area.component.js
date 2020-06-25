import React, { Component } from "react";
import AreaDataService from "../services/area.service";

export default class AddArea extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveArea = this.saveArea.bind(this);
    this.newArea = this.newArea.bind(this);

    this.state = {
      id: null,
      name: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  saveArea() {
    var data = {
      name: this.state.name
    };

    AreaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArea() {
    this.setState({
      id: null,
      name: "",

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
            
            <button onClick={this.saveArea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}