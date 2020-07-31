import React, { Component } from "react";
import SolicitatiempoDataService from "../services/solicitatiempo.service";

export default class Solicitatiempo extends Component {
  constructor(props) {
    super(props);
    this.onChangeId_user = this.onChangeId_user.bind(this);
    this.onChangeId_articulo = this.onChangeId_articulo.bind(this);
    this.onChangeDias = this.onChangeDias.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
    this.getSolicitatiempo = this.getSolicitatiempo.bind(this);
    this.updateSolicitatiempo = this.updateSolicitatiempo.bind(this);
    this.deleteSolicitatiempo = this.deleteSolicitatiempo.bind(this);

    this.state = {
      currentSolicitatiempo: {
        id: null,
        userId: "",
        articleId: "", 
        dias: "",
        comentario: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSolicitatiempo(this.props.match.params.id);
  }

  onChangeId_user(e) {
    const userId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSolicitatiempo: {
          ...prevState.currentSolicitatiempo,
          userId: userId
        }
      };
    });
  }

  onChangeId_articulo(e) {
    const articleId = e.target.value;
    
    this.setState(prevState => ({
      currentSolicitatiempo: {
        ...prevState.currentSolicitatiempo,
        articleId: articleId
      }
    }));
  }

  onChangeDias(e) {
    const dias = e.target.value;
    
    this.setState(prevState => ({
      currentSolicitatiempo: {
        ...prevState.currentSolicitatiempo,
        dias: dias
      }
    }));
  }

  onChangeComentario(e) {
    const comentario = e.target.value;
    
    this.setState(prevState => ({
      currentSolicitatiempo: {
        ...prevState.currentSolicitatiempo,
        comentario: comentario
      }
    }));
  }

  getSolicitatiempo(id) {
    SolicitatiempoDataService.get(id)
      .then(response => {
        this.setState({
          currentSolicitatiempo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSolicitatiempo() {
    SolicitatiempoDataService.update(
      this.state.currentSolicitatiempo.id,
      this.state.currentSolicitatiempo
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Solicitatiempo was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSolicitatiempo() {    
    SolicitatiempoDataService.delete(this.state.currentSolicitatiempo.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/solicitatiempos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSolicitatiempo } = this.state;

    return (
      <div>
        {currentSolicitatiempo ? (
          <div className="edit-form">
            <h4>Solicita-tiempo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="userId">userId</label>
                <input
                  type="text"
                  className="form-control"
                  id="userId"
                  value={currentSolicitatiempo.userId}
                  onChange={this.onChangeId_user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="articleId">articleId</label>
                <input
                  type="text"
                  className="form-control"
                  id="articleId"
                  value={currentSolicitatiempo.articleId}
                  onChange={this.onChangeId_articulo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dias">Dias</label>
                <input
                  type="text"
                  className="form-control"
                  id="dias"
                  value={currentSolicitatiempo.dias}
                  onChange={this.onChangeDias}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">Comentario</label>
                <input
                  type="text"
                  className="form-control"
                  id="comentario"
                  value={currentSolicitatiempo.comentario}
                  onChange={this.onChangeComentario}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSolicitatiempo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSolicitatiempo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Solicitatiempo...</p>
          </div>
        )}
      </div>
    );
  }
}