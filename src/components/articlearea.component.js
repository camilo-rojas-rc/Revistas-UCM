import React, { Component } from "react";
import ArticleareaDataService from "../services/articlearea.service";

export default class Articlearea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.getArticlearea = this.getArticlearea.bind(this);
    this.updateArticlearea = this.updateArticlearea.bind(this);
    this.deleteArticlearea = this.deleteArticlearea.bind(this);

    this.state = {
      currentArticlearea: {
        id: null,
        articleId: "null",
        areaId: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArticlearea(this.props.match.params.id);
  }

  onChangeId_articulo(e) {
    const articleId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArticlearea: {
          ...prevState.currentArticlearea,
          articleId: articleId
        }
      };
    });
  }

  onChangeId_area(e) {
    const areaId = e.target.value;
    
    this.setState(prevState => ({
      currentArticlearea: {
        ...prevState.currentArticlearea,
        areaId: areaId
      }
    }));
  }

  getArticlearea(id) {
    ArticleareaDataService.get(id)
      .then(response => {
        this.setState({
          currentArticlearea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArticlearea() {
    ArticleareaDataService.update(
      this.state.currentArticlearea.id,
      this.state.currentArticlearea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Articlearea was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArticlearea() {    
    ArticleareaDataService.delete(this.state.currentArticlearea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/articleareas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArticlearea } = this.state;

    return (
      <div>
        {currentArticlearea ? (
          <div className="edit-form">
            <h4>Article-area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="articleId">articleId</label>
                <input
                  type="text"
                  className="form-control"
                  id="articleId"
                  value={currentArticlearea.articleId}
                  onChange={this.onChangeId_articulo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="areaId">areaId</label>
                <input
                  type="text"
                  className="form-control"
                  id="areaId"
                  value={currentArticlearea.areaId}
                  onChange={this.onChangeId_area}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArticlearea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArticlearea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Articlearea...</p>
          </div>
        )}
      </div>
    );
  }
}