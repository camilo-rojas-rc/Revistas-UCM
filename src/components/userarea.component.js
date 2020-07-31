import React, { Component } from "react";
import UserareaDataService from "../services/userarea.service";

export default class Userarea extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_area = this.onChangeId_area.bind(this);
    this.getUserarea = this.getUserarea.bind(this);
    this.updateUserarea = this.updateUserarea.bind(this);
    this.deleteUserarea = this.deleteUserarea.bind(this);

    this.state = {
      currentUserarea: {
        id: null,
        userId: "null",
        areaId: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUserarea(this.props.match.params.id);
  }

  onChangeId_user(e) {
    const userId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUserarea: {
          ...prevState.currentUserarea,
          userId: userId
        }
      };
    });
  }

  onChangeId_area(e) {
    const areaId = e.target.value;
    
    this.setState(prevState => ({
      currentUserarea: {
        ...prevState.currentUserarea,
        areaId: areaId
      }
    }));
  }

  getUserarea(id) {
    UserareaDataService.get(id)
      .then(response => {
        this.setState({
          currentUserarea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUserarea() {
    UserareaDataService.update(
      this.state.currentUserarea.id,
      this.state.currentUserarea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Userarea was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUserarea() {    
    UserareaDataService.delete(this.state.currentUserarea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/userareas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUserarea } = this.state;

    return (
      <div>
        {currentUserarea ? (
          <div className="edit-form">
            <h4>User-area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="userId">userId</label>
                <input
                  type="text"
                  className="form-control"
                  id="userId"
                  value={currentUserarea.userId}
                  onChange={this.onChangeId_user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="areaId">areaId</label>
                <input
                  type="text"
                  className="form-control"
                  id="areaId"
                  value={currentUserarea.areaId}
                  onChange={this.onChangeId_area}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUserarea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUserarea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Userarea...</p>
          </div>
        )}
      </div>
    );
  }
}