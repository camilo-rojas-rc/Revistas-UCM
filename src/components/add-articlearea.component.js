import React, { Component } from "react";
import ArticleareaDataService from "../services/articlearea.service";

export default class AddArticlearea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.saveArticlearea = this.saveArticlearea.bind(this);
    this.newArticlearea = this.newArticlearea.bind(this);

    this.state = {
      id: null,
      id_articulo: "null",
      id_area: "null", 

      submitted: false
    };
  }

  onChangeId_articulo(e) {
    this.setState({
        id_articulo: e.target.value
    });
  }

  onChangeId_area(e) {
    this.setState({
        id_area: e.target.value
    });
  }

  saveArticlearea() {
    var data = {
        id_articulo: this.state.id_articulo,
        id_area: this.state.id_area
    };

    ArticleareaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          id_articulo: response.data.id_articulo,
          id_area: response.data.id_area,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArticlearea() {
    this.setState({
      id: null,
      id_articulo: "null",
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
              <label htmlFor="id_articulo">Id_articulo</label>
              <input
                type="text"
                className="form-control"
                id="id_articulo"
                required
                value={this.state.id_articulo}
                onChange={this.onChangeId_articulo}
                name="id_articulo"
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

            <button onClick={this.saveArticlearea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}