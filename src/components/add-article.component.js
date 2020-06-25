import React, { Component } from "react";
import ArticleDataService from "../services/article.service";

export default class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangeCommentary = this.onChangeCommentary.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthors = this.onChangeAuthors.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
        id: null,
        title: "",
        state: "",
        document: "",
        commentary: "",
        description: "",
        authors: "",
        published: false,

        submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangeDocument(e) {
    this.setState({
      document: e.target.value
    });
  }

  onChangeCommentary(e) {
    this.setState({
      commentary: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAuthors(e) {
    this.setState({
      authors: e.target.value
    });
  }

  saveArticle() {
    var data = {
      title: this.state.title,
      state: this.state.state,
      document: this.state.document,
      commentary: this.state.commentary,
      description: this.state.description,
      authors: this.state.authors
    };

    ArticleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          state: response.data.state,
          document: response.data.document,
          commentary: response.data.commentary,
          description: response.data.description,
          authors: response.data.authors,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArticle() {
    this.setState({
      id: null,
      title: "",
      state: "",
      document: "",
      commentary: "",
      description: "",
      authors: "",
      published: false,

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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                required
                value={this.state.state}
                onChange={this.onChangeState}
                name="state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="document">Document</label>
              <input
                type="text"
                className="form-control"
                id="document"
                required
                value={this.state.document}
                onChange={this.onChangeDocument}
                name="document"
              />
            </div>

            <div className="form-group">
              <label htmlFor="commentary">Commentary</label>
              <input
                type="text"
                className="form-control"
                id="commentary"
                required
                value={this.state.commentary}
                onChange={this.onChangeCommentary}
                name="commentary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="authors">Authors</label>
              <input
                type="text"
                className="form-control"
                id="authors"
                required
                value={this.state.authors}
                onChange={this.onChangeAuthors}
                name="authors"
              />
            </div>

            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}