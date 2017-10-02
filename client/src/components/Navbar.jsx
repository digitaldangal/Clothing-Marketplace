import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
            <div className='ui stackable menu'>
                <div className="item">
                    <Link to="/designers">Designers</Link>
                </div>
                <div className="item">
                    <Link to="/editorial">Articles</Link>
                </div>
                <div className="item">
                    <Link to="/account/wishlist">Wishlist</Link>
                </div>
                <div className="item">
                    <Link to="/cart">Cart</Link>
                </div>
                <div className="item">
                    <Link to="/about">About</Link>
                </div>
                <div className="item">
                    <Link to="/"><img src="/images/brand.png" alt="Copped Logo"/></Link>
                </div>
                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                    <div className="item">
                        <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    render(){
    return (
        <header>
            <nav>
                { this.props.authState ? this.renderAuthNav() : this.renderNav()}
            </nav>
        </header>
        )
    }
}

export default Navbar;