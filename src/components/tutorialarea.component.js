import React, { Component } from "react";
import TutorialareaDataService from "../services/tutorialarea.service";

export default class Tutorialarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_tutorial = this.onChangeId_tutorial.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.getTutorialarea = this.getTutorialarea.bind(this);
    this.updateTutorialarea = this.updateTutorialarea.bind(this);
    this.deleteTutorialarea = this.deleteTutorialarea.bind(this);

    this.state = {
      currentTutorialarea: {
        id: null,
        id_tutorial: "null",
        id_area: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorialarea(this.props.match.params.id);
  }

  onChangeId_tutorial(e) {
    const id_tutorial = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorialarea: {
          ...prevState.currentTutorialarea,
          id_tutorial: id_tutorial
        }
      };
    });
  }

  onChangeId_area(e) {
    const id_area = e.target.value;
    
    this.setState(prevState => ({
      currentTutorialarea: {
        ...prevState.currentTutorialarea,
        id_area: id_area
      }
    }));
  }

  getTutorialarea(id) {
    TutorialareaDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorialarea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorialarea() {
    TutorialareaDataService.update(
      this.state.currentTutorialarea.id,
      this.state.currentTutorialarea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Tutorialarea was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorialarea() {    
    TutorialareaDataService.delete(this.state.currentTutorialarea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorialareas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorialarea } = this.state;

    return (
      <div>
        {currentTutorialarea? (
          <div className="edit-form">
            <h4>Tutorial-area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id_tutorial">Id_tutorial</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_tutorial"
                  value={currentTutorialarea.id_tutorial}
                  onChange={this.onChangeId_tutorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_area">Id_area</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_area"
                  value={currentTutorialarea.id_area}
                  onChange={this.onChangeId_area}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorialarea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorialarea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorialarea...</p>
          </div>
        )}
      </div>
    );
  }
}