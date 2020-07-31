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
        revistaId: "null",
        articuloId: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorialarticle(this.props.match.params.id);
  }

  onChangeId_tutorial(e) {
    const revistaId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorialarticle: {
          ...prevState.currentTutorialarticle,
          revistaId: revistaId
        }
      };
    });
  }

  onChangeId_article(e) {
    const articuloId = e.target.value;
    
    this.setState(prevState => ({
      currentTutorialarticle: {
        ...prevState.currentTutorialarticle,
        articuloId: articuloId
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
                <label htmlFor="revistaId">revistaId</label>
                <input
                  type="text"
                  className="form-control"
                  id="revistaId"
                  value={currentTutorialarticle.revistaId}
                  onChange={this.onChangeId_tutorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="articuloId">articuloId</label>
                <input
                  type="text"
                  className="form-control"
                  id="articuloId"
                  value={currentTutorialarticle.articuloId}
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