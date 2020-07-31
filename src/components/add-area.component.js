import React, { Component } from "react";
import AreaDataService from "../services/area.service";

export default class AddArea extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveArea = this.saveArea.bind(this);
    this.newArea = this.newArea.bind(this);

    this.state = {
      id: null,
      nombre: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  saveArea() {
    var data = {
      nombre: this.state.nombre
    };

    AreaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArea() {
    this.setState({
      id: null,
      nombre: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nombre">nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeName}
                nombre="nombre"
              />
            </div>
            
            <button onClick={this.saveArea} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}