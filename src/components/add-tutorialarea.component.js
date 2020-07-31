import React, { Component } from "react";
import TutorialareaDataService from "../services/tutorialarea.service";

export default class AddTutorialarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_tutorial = this.onChangeId_tutorial.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.saveTutorialarea = this.saveTutorialarea.bind(this);
    this.newTutorialarea = this.newTutorialarea.bind(this);

    this.state = {
      id: null,
      revistaId: "null",
      areaId: "null",

      submitted: false
    };
  }

  onChangeId_tutorial(e) {
    this.setState({
        revistaId: e.target.value
    });
  }

  onChangeId_area(e) {
    this.setState({
      areaId: e.target.value
    });
  }

  saveTutorialarea() {
    var data = {
        revistaId: this.state.revistaId,
        areaId: this.state.areaId
    };

    TutorialareaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          revistaId: response.data.revistaId,
          areaId: response.data.areaId,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorialarea() {
    this.setState({
      id: null,
      revistaId: "null",
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
              <label htmlFor="revistaId">revistaId</label>
              <input
                type="text"
                className="form-control"
                id="revistaId"
                required
                value={this.state.revistaId}
                onChange={this.onChangeId_tutorial}
                name="revistaId"
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

            <button onClick={this.saveTutorialarea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}