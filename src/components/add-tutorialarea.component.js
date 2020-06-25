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
      id_tutorial: "null",
      id_area: "null",

      submitted: false
    };
  }

  onChangeId_tutorial(e) {
    this.setState({
        id_tutorial: e.target.value
    });
  }

  onChangeId_area(e) {
    this.setState({
      id_area: e.target.value
    });
  }

  saveTutorialarea() {
    var data = {
        id_tutorial: this.state.id_tutorial,
        id_area: this.state.id_area
    };

    TutorialareaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_tutorial: response.data.id_tutorial,
          id_area: response.data.id_area,

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
      id_tutorial: "null",
      id_area: "null",

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
              <label htmlFor="id_tutorial">Id_tutorial</label>
              <input
                type="text"
                className="form-control"
                id="id_tutorial"
                required
                value={this.state.id_tutorial}
                onChange={this.onChangeId_tutorial}
                name="id_tutorial"
              />
            </div>

            <div className="form-group">
              <label htmlFor="id_area">Id_area</label>
              <input
                type="text"
                className="form-control"
                id="id_area"
                required
                value={this.state.id_area}
                onChange={this.onChangeId_area}
                name="id_area"
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