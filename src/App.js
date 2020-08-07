import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Inicio from "./components/inicio.component";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AddArticle from "./components/add-article.component";
import Article from "./components/article.component";
import ArticlesList from "./components/articles-list.component";
import AddUser from "./components/add-user.component";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";
import AddArea from "./components/add-area.component";
import Area from "./components/area.component";
import AreasList from "./components/areas-list.component";
import AddTutorialarticle from "./components/add-tutorialarticle.component";
import Tutorialarticle from "./components/tutorialarticle.component";
import TutorialarticlesList from "./components/tutorialarticles-list.component";
import AddUserarea from "./components/add-userarea.component";
import Userarea from "./components/userarea.component";
import UserareasList from "./components/userareas-list.component";
import AddTutorialarea from "./components/add-tutorialarea.component";
import Tutorialarea from "./components/tutorialarea.component";
import TutorialareasList from "./components/tutorialareas-list.component";
import AddArticlearea from "./components/add-articlearea.component";
import Articlearea from "./components/articlearea.component";
import ArticleareasList from "./components/articleareas-list.component";
import AddSolicitatiempo from "./components/add-solicitatiempo.component";
import Solicitatiempo from "./components/solicitatiempo.component";
import SolicitatiemposList from "./components/solicitatiempos-list.component";
import AddSolicitarol from "./components/add-solicitarol.component";
import Solicitarol from "./components/solicitarol.component";
import SolicitarolsList from "./components/solicitarols-list.component";
import AddAsignacion from "./components/add-asignacion.component";
import Asignacion from "./components/asignacion.component";
import AsignacionsList from "./components/asignacions-list.component";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <a href="/" className="navbar-brand">
              <img src="./logo-UCM.png" width="150" height="50" />
            </a>
            <div className="navbar-nav mr-auto">

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Mi Perfil
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/tutorials"} className="nav-link">
                    Revistas
                </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/articles"} className="nav-link">
                    Articulos
                </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/tutorialarticles"} className="nav-link">
                    Revista-articulos
                </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/areas"} className="nav-link">
                    Areas
                </Link>
                </li>
              )}

            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nombre}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                  </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                  </Link>
                  </li>
                </div>
              )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/"]} component={Inicio} />
              <Route exact path={["/tutorials"]} component={TutorialsList} />
              <Route exact path="/tutorials/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
              <Route exact path={["/articles"]} component={ArticlesList} />
              <Route exact path="/articles/add/:id" component={AddArticle} />
              <Route path="/articles/:id" component={Article} />
              <Route exact path={["/users"]} component={UsersList} />
              <Route exact path="/users/add" component={AddUser} />
              <Route path="/users/:id" component={User} />
              <Route exact path={["/areas"]} component={AreasList} />
              <Route exact path="/areas/add" component={AddArea} />
              <Route path="/areas/:id" component={Area} />
              <Route exact path={["/tutorialarticles"]} component={TutorialarticlesList} />
              <Route exact path="/tutorialarticles/add" component={AddTutorialarticle} />
              <Route path="/tutorialarticles/:id" component={Tutorialarticle} />
              <Route exact path={["/userareas"]} component={UserareasList} />
              <Route exact path="/userareas/add/:id1/:id2" component={AddUserarea} />
              <Route path="/userareas/:id" component={Userarea} />
              <Route exact path={["/tutorialareas"]} component={TutorialareasList} />
              <Route exact path="/tutorialareas/add" component={AddTutorialarea} />
              <Route path="/tutorialareas/:id" component={Tutorialarea} />
              <Route exact path={["/articleareas"]} component={ArticleareasList} />
              <Route exact path="/articleareas/add" component={AddArticlearea} />
              <Route path="/articleareas/:id" component={Articlearea} />
              <Route exact path={["/solicitatiempos"]} component={SolicitatiemposList} />
              <Route exact path="/solicitatiempos/add" component={AddSolicitatiempo} />
              <Route path="/solicitatiempos/:id" component={Solicitatiempo} />
              <Route exact path={["/solicitarols"]} component={SolicitarolsList} />
              <Route exact path="/solicitarols/add/:id" component={AddSolicitarol} />
              <Route path="/solicitarols/:id" component={Solicitarol} />
              <Route exact path={["/asignacions"]} component={AsignacionsList} />
              <Route exact path="/asignacions/add" component={AddAsignacion} />
              <Route path="/asignacions/:id" component={Asignacion} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;