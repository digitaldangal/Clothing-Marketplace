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
        // ui.start('#firebaseui-auth-container', uiConfig);
    }

    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit=(e)=>{
        e.preventDefault();
        console.log('Login Submit')
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res=>{
            console.log(res)
            firebase.auth().onAuthStateChanged((user)=>{
                if (user) {
                    this.setState({userInfo: user.toJSON()})
                    this.props.authState(true)
                } else {
                    console.log('User is not logged in')
                    this.props.authState(false)
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

    handleRegisterSubmit=(e)=>{
        e.preventDefault();
        console.log('Register Submit')
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            // Handle Errors here.
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(errorCode, errorMessage)
        });
    }

    
    render(){
        return(
            <div className="auth-form">
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                        <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
                <div className="login-form">
                    <h1>Create An Account</h1>
                    <form onSubmit={this.handleRegisterSubmit}>
                        <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                        <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
                {/* <div className="login-form">
                    <h1>Or</h1>
                    <div id="firebaseui-auth-container"></div>
                </div> */}
            </div>
        )
    }
}

export default Login;