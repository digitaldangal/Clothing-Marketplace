import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import{BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  handleSubmit=(e)=>{
    e.preventDefault();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header>
              <div className='wrapper'>
                <h1>Copped App</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
          </header>
          <div className="app-body">
            <Switch>
              <Route exact path="/login" render={() => <Login submit={this.handleLoginSubmit} />} />
              <Route exact path="/register" render={() => <Register submit={this.handleRegisterSubmit} />}/>
            </Switch>
          </div>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
