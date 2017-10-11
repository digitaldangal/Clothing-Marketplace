import React, { Component } from 'react';
import firebase from './config/firebase';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import ProductUpload from './components/ProductUpload';
import BrandForm from './components/BrandForm';
import Designers from './components/Designers';
import Designer from './components/Designer';
import Article from './components/Article';
import About from './components/About';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';

import './App.css';

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
          <div className="App">
            <Navbar authState={this.state.authState} userInfo={this.state.userInfo} authStateChange={(userStatus)=>this.handleAuthState(userStatus)}/>
            <div className="app-body">
              <Switch>
                <Route exact path="/" render={() => <Home authState={this.state.authState} /> } />
                <Route exact path="/account/login" render={() => <Login authState={this.loginSuccess}  registersSubmit={this.handleRegisterSubmit} loginSubmit={this.handleLoginSubmit} /> } />
                <Route exact path="/profile" render={() => <Profile authState={this.state.authState} userInfo={this.state.userInfo} authStateChange={(userStatus)=>this.handleAuthState(userStatus)}/> } />
                <Route exact path="/profile/brand-signup" component={BrandForm} />
                <Route exact path="/profile/product-create" component={ProductUpload} />
                <Route exact path="/designers" render={() => <Designers authState={this.state.authState} /> } />
                <Route exact path="/designers/:brand" render={() => <Designer authState={this.state.authState} /> } />
                <Route exact path="/editorial/" render={() => <Article authState={this.state.authState} /> } />
                <Route exact path="/editorial/:article" render={() => <Article authState={this.state.authState} /> } />
                <Route exact path="/about" component={About} />
                <Route component={NoMatch} />
                {redirect ? <Redirect to={currentPage} /> : null}
              </Switch>
            </div>
            <Footer />
          </div>
      </Router>
    );
  }
}

export default App;
