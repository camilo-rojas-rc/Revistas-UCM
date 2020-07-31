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
        revistaId: "null",
        areaId: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorialarea(this.props.match.params.id);
  }

  onChangeId_tutorial(e) {
    const revistaId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorialarea: {
          ...prevState.currentTutorialarea,
          revistaId: revistaId
        }
      };
    });
  }

  onChangeId_area(e) {
    const areaId = e.target.value;
    
    this.setState(prevState => ({
      currentTutorialarea: {
        ...prevState.currentTutorialarea,
        areaId: areaId
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
          message: "Revista-area actualizada!"
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
            <h4>Revista-area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="revistaId">revistaId</label>
                <input
                  type="text"
                  className="form-control"
                  id="revistaId"
                  value={currentTutorialarea.revistaId}
                  onChange={this.onChangeId_tutorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="areaId">areaId</label>
                <input
                  type="text"
                  className="form-control"
                  id="areaId"
                  value={currentTutorialarea.areaId}
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
            <p>Please click on a Revista-area...</p>
          </div>
        )}
      </div>
    );
  }
}