import React, { Component } from "react";
import TutorialarticleDataService from "../services/tutorialarticle.service";

export default class AddTutorialarticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_tutorial = this.onChangeId_tutorial.bind(this);
    this.onChangeId_article = this.onChangeId_article.bind(this);
    this.saveTutorialarticle = this.saveTutorialarticle.bind(this);
    this.newTutorialarticle = this.newTutorialarticle.bind(this);

    this.state = {
      id: null,
      id_tutorial: "null",
      id_article: "null", 

      submitted: false
    };
  }

  onChangeId_tutorial(e) {
    this.setState({
      id_tutorial: e.target.value
    });
  }

  onChangeId_article(e) {
    this.setState({
      id_article: e.target.value
    });
  }

  saveTutorialarticle() {
    var data = {
        id_tutorial: this.state.id_tutorial,
        id_article: this.state.id_article
    };

    TutorialarticleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_tutorial: response.data.id_tutorial,
          id_article: response.data.id_article,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorialarticle() {
    this.setState({
      id: null,
      id_tutorial: "null",
      id_article: "null",

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
              <label htmlFor="id_article">Id_article</label>
              <input
                type="text"
                className="form-control"
                id="id_article"
                required
                value={this.state.id_article}
                onChange={this.onChangeId_article}
                name="id_article"
              />
            </div>

            <button onClick={this.saveTutorialarticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}