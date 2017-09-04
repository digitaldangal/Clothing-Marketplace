import React, { Component } from 'react';
import firebase from '../config/firebase';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('Logging In')
        console.log(this.state.email, this.state.password)
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
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div className="auth-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default Register;