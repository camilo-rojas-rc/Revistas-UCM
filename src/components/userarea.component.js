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
        id_user: "null",
        id_area: "null"
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUserarea(this.props.match.params.id);
  }

  onChangeId_user(e) {
    const id_user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUserarea: {
          ...prevState.currentUserarea,
          id_user: id_user
        }
      };
    });
  }

  onChangeId_area(e) {
    const id_area = e.target.value;
    
    this.setState(prevState => ({
      currentUserarea: {
        ...prevState.currentUserarea,
        id_area: id_area
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
                <label htmlFor="id_user">Id_user</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_user"
                  value={currentUserarea.id_user}
                  onChange={this.onChangeId_user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_area">Id_area</label>
                <input
                  type="text"
                  className="form-control"
                  id="id_area"
                  value={currentUserarea.id_area}
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