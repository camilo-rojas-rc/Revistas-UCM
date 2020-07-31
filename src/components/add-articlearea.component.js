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
      articleId: "null",
      areaId: "null", 

      submitted: false
    };
  }

  onChangeId_articulo(e) {
    this.setState({
        articleId: e.target.value
    });
  }

  onChangeId_area(e) {
    this.setState({
        areaId: e.target.value
    });
  }

  saveArticlearea() {
    var data = {
        articleId: this.state.articleId,
        areaId: this.state.areaId
    };

    ArticleareaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          articleId: response.data.articleId,
          areaId: response.data.areaId,

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
      articleId: "null",
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
              <label htmlFor="articleId">articleId</label>
              <input
                type="text"
                className="form-control"
                id="articleId"
                required
                value={this.state.articleId}
                onChange={this.onChangeId_articulo}
                name="articleId"
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

            <button onClick={this.saveArticlearea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}