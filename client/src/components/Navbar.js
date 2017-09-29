import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    menuToggle=(e)=>{
        document.querySelector('.side-menu hide-menu').className = "side-menu show-menu"
    }
    handleLogOut(){
        if(window.confirm("Do you want to log out?")){
            firebase.auth().signOut()
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            this.props.authStateChange("signed out")
        }else{
            console.log("logged out cancel")
            return null
        }
    }
    renderAuthNav(){
        return(
            <div className='wrapper'>
                <h2>Welcome {this.props.userInfo.email}</h2>
                <button onClick={()=>this.handleLogOut()}>Sign Out</button>
            </div>
        )
    }

    renderNav(){
        return(
            <div className='wrapper'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        )
    }

    render(){
    return (
        <header>
            <nav>
                
            </nav>
        </header>
        )
    }
}

export default Navbar
// {this.props.authState ? this.renderAuthNav() : this.renderNav()}