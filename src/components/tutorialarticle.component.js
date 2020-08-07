import React, { Component } from "react";
import TutorialarticleDataService from "../services/tutorialarticle.service";

export default class Tutorialarticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_tutorial = this.onChangeId_tutorial.bind(this);
    this.onChangeId_article = this.onChangeId_article.bind(this);
    this.getTutorialarticle = this.getTutorialarticle.bind(this);
    this.updateTutorialarticle = this.updateTutorialarticle.bind(this);
    this.deleteTutorialarticle = this.deleteTutorialarticle.bind(this);

    this.state = {
      currentTutorialarticle: {
        id: null,
        id_tutorial: "null",
        id_article: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorialarticle(this.props.match.params.id);
  }

  onChangeId_tutorial(e) {
    const id_tutorial = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorialarticle: {
          ...prevState.currentTutorialarticle,
          id_tutorial: id_tutorial
        }
      };
    });
  }

  onChangeId_article(e) {
    const id_article = e.target.value;
    
    this.setState(prevState => ({
      currentTutorialarticle: {
        ...prevState.currentTutorialarticle,
        id_article: id_article
      }
    }));
  }

  getTutorialarticle(id) {
    TutorialarticleDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorialarticle: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorialarticle() {
    TutorialarticleDataService.update(
      this.state.currentTutorialarticle.id,
      this.state.currentTutorialarticle
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "La revista-articulo se actualizo!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorialarticle() {    
    TutorialarticleDataService.delete(this.state.currentTutorialarticle.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorialarticles')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorialarticle } = this.state;

    return (
      <div>
        {currentTutorialarticle ? (
          <div className="edit-form">
            <h4>Revista-article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id_tutorial">id_tutorial</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_tutorial"
                  value={currentTutorialarticle.id_tutorial}
                  onChange={this.onChangeId_tutorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_article">id_article</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_article"
                  value={currentTutorialarticle.id_article}
                  onChange={this.onChangeId_article}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorialarticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorialarticle}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Revista-article...</p>
          </div>
        )}
      </div>
    );
  }
}