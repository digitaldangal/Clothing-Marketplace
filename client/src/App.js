import React, { Component } from 'react';
import firebase from './config/firebase';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import ApprovedBrand from './components/ApprovedBrand';
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
      userInfo: false,
      redirect: false,
      currentPage: '',
      uid: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(`${user.email} is logged in`)
          this.setState({
            userInfo: user.toJSON(),
            authState: true,
            redirect: false,
            currentPage: '',
            uid: user.uid
          })
      } else {
          console.log('User is not logged in')
          this.setState({
            authState: false
          })
      }
    })
  }

  handleAuthState=(authChange)=>{
    if(authChange === false){
      firebase.auth().signOut()
      .then(res=>{
        console.log(res)
        this.setState({
          authState: false
        })
      }).catch(err=>console.log(err))
    }else if(authChange === true){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({
            authState: true,
          })
        }else{
          this.setState({
            authState: false
          })
        }
      })
    }else{
      return null;
    }
  }

  render() {
    const {redirect, currentPage} = this.state
    return (
      <Router>
          <div className="App">
            <Navbar authState={this.state.authState} userInfo={this.state.userInfo} authStateChange={(authChange)=>this.handleAuthState(authChange)}/>
            <div className="app-body">
              <Switch>
                {redirect ? <Redirect to={currentPage} /> : null}
                <Route exact path="/" render={() => <Home authState={this.state.authState} /> } />
                <Route exact path="/account/login" render={() => <Login authState={(authChange)=>this.handleAuthState(authChange)} /> } />
                <Route exact path="/profile" render={() => <Profile authState={this.state.authState} userInfo={this.state.userInfo} authStateChange={(authChange)=>this.handleAuthState(authChange)}/> } />
                <Route exact path="/profile/brand-signup" component={BrandForm} />
                <Route exact path="/profile/product-create" component={ProductUpload}/>
                <Route exact path="/profile/brand" render={()=> <ApprovedBrand authState={this.state.authState} userUid={this.state.uid} /> } />
                <Route exact path="/designers" render={() => <Designers authState={this.state.authState} /> } />
                <Route exact path="/designers/:brand" render={() => <Designer authState={this.state.authState} /> } />
                <Route exact path="/editorial/" render={() => <Article authState={this.state.authState} /> } />
                <Route exact path="/editorial/:article" render={() => <Article authState={this.state.authState} /> } />
                <Route exact path="/about" component={About} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
      </Router>
    );
  }
}

export default App;
