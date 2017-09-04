import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: undefined,
            pass: undefined
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('Logging In')
        console.log(this.state.email, this.state.pass)
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}