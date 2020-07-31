import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    //declaracion de la funciones
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    //declaracion de los strings que se usaran en las funciones
    this.state = {
      id: null,
      titulo: "",
      descripcion: "", 
      published: false,

      submitted: false
    };
  }

  //las funciones onChange toman el valor pasado por un formulario y lo guardan en un string
  onChangeTitle(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      descripcion: e.target.value
    });
  }

  //funcion que guarda los datos en la bd
  saveTutorial() {
    var data = {
      titulo: this.state.titulo,
      descripcion: this.state.descripcion
    };

    //se hace un llamada a la funcion create para crear una tabla con los valores pasados pr formulario
    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          descripcion: response.data.descripcion,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //crea una nueva tabla
  newTutorial() {
    this.setState({
      id: null,
      titulo: "",
      descripcion: "",
      published: false,

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
              <label htmlFor="titulo">titulo</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                required
                value={this.state.titulo}
                onChange={this.onChangeTitle}
                name="titulo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={this.state.descripcion}
                onChange={this.onChangeDescription}
                name="descripcion"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}