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
            revistaId: "",
            articuloId: "", 

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
          revistaId: e.target.value
        });
      }
    
      onChangeId_article(e) {
        this.setState({
          articuloId: e.target.value
        });
      }
    
      saveTutorialarticle() {
        var data = {
            revistaId: this.state.revistaId,
            articuloId: this.state.articuloId
        };
    
        TutorialarticleDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              revistaId: response.data.revistaId,
              articuloId: response.data.articuloId,
    
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
          revistaId: "null",
          articuloId: "null",
    
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
                                    <label htmlFor="revistaId">Id_revista</label>
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
                                    <label htmlFor="articuloId">articuloId</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="articuloId"
                                        required
                                        value={this.state.articuloId}
                                        onChange={this.onChangeId_article}
                                        name="articuloId"
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