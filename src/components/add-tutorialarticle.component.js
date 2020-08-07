import React, { Component } from "react";
import TutorialarticleDataService from "../services/tutorialarticle.service";

export default class AddTutorialarticle extends Component {
    constructor(props) {
        super(props);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.retrieveArticles = this.retrieveArticles.bind(this);
        this.setActiveTutorials = this.setActiveTutorials.bind(this);
        this.setActiveArticles = this.setActiveArticles.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.onChangeId_tutorial = this.onChangeId_tutorial.bind(this);
        this.onChangeId_article = this.onChangeId_article.bind(this);
        this.saveTutorialarticle = this.saveTutorialarticle.bind(this);
        this.newTutorialarticle = this.newTutorialarticle.bind(this);

        this.state = {
            tutorials: [],
            articles: [],
            currentItem: null,
            currentIndex: -1,
            id: null,
            id_tutorial: "",
            id_article: "", 

            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
        this.retrieveArticles();
    }

    setActiveTutorials(tutorial, index) {
        this.setState({
            currentItem: tutorial,
            currentIndex: index
        });
    }

    setActiveArticles(article, index) {
        this.setState({
            currentItem: article,
            currentIndex: index
        });
    }

    retrieveTutorials() {
        TutorialarticleDataService.getAllrevistas()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveArticles() {
        TutorialarticleDataService.getAllarticulo()
            .then(response => {
                this.setState({
                    articles: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveArticles();
        this.retrieveTutorials();
        this.setState({
            currentItem: null,
            currentIndex: -1
        });
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
        const { tutorials, articles, currentItem, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Lista de Revistas</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorials(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.id}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Articulos</h4>

                    <ul className="list-group">
                        {articles &&
                            articles.map((article, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveArticles(article, index)}
                                    key={index}
                                >
                                    {article.id}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-8">
                    {currentItem ? (
                        <div>
                            <h4>Resumen</h4>
                            <div>
                                <label>
                                    <strong>ID:</strong>
                                </label>{" "}
                                {currentItem.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Titulo:</strong>
                                </label>{" "}
                                {currentItem.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Descripcion:</strong>
                                </label>{" "}
                                {currentItem.description}
                            </div>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on table...</p>
                            </div>
                        )}
                </div>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                        </div>
                    ) : (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="id_tutorial">Id_revista</label>
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
                                    <label htmlFor="id_article">id_article</label>
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
            </div>
        );
    }
}