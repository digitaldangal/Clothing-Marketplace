import React, { Component } from 'react';
import firebase from '../config/firebase';
import ui, {uiConfig} from '../config/firebaseui';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            pass: undefined,
            userInfo: undefined
        }
    }
    componentDidMount(){
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('Logging In')
        console.log(this.state.email, this.state.pass)
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res=>{
            console.log(res)
            firebase.auth().onAuthStateChanged((user)=>{
                if (user) {
                    this.setState({userInfo: user.toJSON()})
                    this.props.authState(true)
                } else {
                    console.log('User is not logged in')
                }
            })
        })
        .catch(err=>{
            // Handle Errors here.
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(errorCode, errorMessage)
        });
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div className="auth-form">
                <h1>Login to your account</h1>
                <div id="firebaseui-auth-container"></div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="Login"/>
                </form>
                Don't have an account yet? <a href="/register">Sign Up</a>
            </div>
        )
    }
}

export default Login;