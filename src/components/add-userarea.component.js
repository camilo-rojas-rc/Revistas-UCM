import React, { Component } from "react";
import UserareaDataService from "../services/userarea.service";

export default class AddUserarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.saveUserarea = this.saveUserarea.bind(this);
    this.newUserarea = this.newUserarea.bind(this);

    this.state = {
      id: null,
      userId: "null",
      areaId: "null",

      submitted: false
    };
  }

  onChangeId_user(e) {
    this.setState({
      userId: e.target.value
    });
  }

  onChangeId_area(e) {
    this.setState({
      areaId: e.target.value
    });
  }

  saveUserarea() {
    var data = {
        userId: this.state.userId,
        areaId: this.state.areaId
    };

    UserareaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          userId: response.data.userId,
          areaId: response.data.areaId,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUserarea() {
    this.setState({
      id: null,
      userId: "null",
      areaId: "null",

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
              <label htmlFor="userId">userId</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                required
                value={this.state.userId}
                onChange={this.onChangeId_user}
                name="userId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="areaId">areaId</label>
              <input
                type="text"
                className="form-control"
                id="areaId"
                required
                value={this.state.areaId}
                onChange={this.onChangeId_area}
                name="areaId"
              />
            </div>

            <button onClick={this.saveUserarea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}