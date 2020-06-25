import React, { Component } from "react";
import ArticleareaDataService from "../services/articlearea.service";
import { Link } from "react-router-dom";

export default class ArticleareasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchId_articulo = this.onChangeSearchId_articulo.bind(this);
    this.retrieveArticleareas = this.retrieveArticleareas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticlearea = this.setActiveArticlearea.bind(this);
    this.removeAllArticleareas = this.removeAllArticleareas.bind(this);
    this.searchId_articulo = this.searchId_articulo.bind(this);

    this.state = {
      articleareas: [],
      currentArticlearea: null,
      currentIndex: -1,
      searchId_articulo: ""
    };
  }

  componentDidMount() {
    this.retrieveArticleareas();
  }

  onChangeSearchId_articulo(e) {
    const searchId_articulo = e.target.value;

    this.setState({
      searchId_articulo: searchId_articulo
    });
  }

  retrieveArticleareas() {
    ArticleareaDataService.getAll()
      .then(response => {
        this.setState({
          articleareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArticleareas();
    this.setState({
      currentArticlearea: null,
      currentIndex: -1
    });
  }

  setActiveArticlearea(articlearea, index) {
    this.setState({
      currentArticlearea: articlearea,
      currentIndex: index
    });
  }

  removeAllArticleareas() {
    ArticleareaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchId_articulo() {
    ArticleareaDataService.findById_articulo(this.state.searchId_articulo)
      .then(response => {
        this.setState({
          articleareas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchId_articulo, articleareas, currentArticlearea, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchId_articulo}
              onChange={this.onChangeSearchId_articulo}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchId_articulo}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Article-areas List</h4>

          <ul className="list-group">
            {articleareas &&
              articleareas.map((articlearea, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticlearea(articlearea, index)}
                  key={index}
                >
                  {articlearea.id_articulo}
                </li>
              ))}
          </ul>
          
          <button className="m-3 btn btn-sm btn-danger">
            <Link to={"/articleareas/add"}>
              Add
            </Link>
          </button>
        </div>
        <div className="col-md-6">
          {currentArticlearea ? (
            <div>
              <h4>Article-area</h4>
              <div>
                <label>
                  <strong>Id_articulo:</strong>
                </label>{" "}
                {currentArticlearea.id_articulo}
              </div>
              <div>
                <label>
                  <strong>Id_area:</strong>
                </label>{" "}
                {currentArticlearea.id_area}
              </div>

              <Link
                to={"/articleareas/" + currentArticlearea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Articlearea...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}