import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    renderAuthNav(){
        return(
            <div className='wrapper'>
                <h1>Copped App</h1>
                <h2>Welcome {this.props.userInfo.email}</h2>
            </div>
        )
    }

    renderNav(){
        return(
            <div className='wrapper'>
                <h1>Copped App</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        )
    }

    render(){
    return (
        <header>
            {this.props.authState ? this.renderAuthNav() : this.renderNav}
            
        </header>
        )
    }
}

export default Navbar