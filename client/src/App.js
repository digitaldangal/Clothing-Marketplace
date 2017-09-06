import React, { Component } from 'react';
import firebase from './config/firebase';
import{BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import './App.css';

// document.querySelector('body').addEventListener('click', function(e) {
//   console.log('click')
//   if(document.querySelector('.side-menu show-menu').className === "side-menu show-menu"){
//     console.log(true)
//     document.querySelector('.side-menu show-menu').className = "side-menu hide-menu"
//   }else{
//     console.log(false)
//     document.querySelector('.side-menu hide-menu').className = "side-menu show-menu"
//   }
// })

class App extends Component {
  constructor(){
    super();
    this.state = {
      authState: false,
      userInfo: undefined,
      redirect: false,
      currentPage: ''
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(`${user.email} is logged in`)
          this.setState({
            userInfo: user.toJSON(),
            authState: true,
            redirect: true,
            currentPage: 'profile'
          })
      } else {
          console.log('User is not logged in')
      }
    })
  }

  handleAuthState(userStatus){
    if(userStatus === "signed out"){
      this.setState({
        authState: false,
        userInfo: undefined
      })
    }else{
      return null
    }
  }

  loginSuccess=(e)=>{
    this.setState({
      authState: true
    })
  }

  render() {
    const {redirect, currentPage} = this.state
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <Navbar authState={this.state.authState} userInfo={this.state.userInfo} authStateChange={(userStatus)=>this.handleAuthState(userStatus)}/>
            <div className="app-body">
              <Switch>
                <Route exact path="" render={() => <Home authState={this.state.authState} /> } />
                <Route exact path="/login" render={() => <Login submit={this.handleLoginSubmit} authState={this.loginSuccess} /> } />
                <Route exact path="/register" render={() => <Register submit={this.handleRegisterSubmit} /> } />
                <Route exact path="/profile" render={() => <Profile authState={this.state.authState} userInfo={this.state.userInfo}/> } />
                {redirect ? <Redirect to={currentPage} /> : null}
              </Switch>
            </div>
            <section className='display-item'>
              <div className='wrapper'>
                <ul>
                </ul>
              </div>
            </section>
          </div>
          </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
