import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            user: undefined
        }
    }

    handleLogOut=()=>{
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

    renderNav(){
        return(
            <div className='ui secondary stackable menu'>
                <div className="item">
                    {/* <Link className="brand" to="/"><img className="logo" src="/main/images/streetwearboutiques_logo.png" alt="StreetwearBoutiques Logo"/></Link> */}
                    <Link className="brand" to="/">StreetwearBoutiques</Link>
                </div>
                <div className="link item">
                    <Link to="/designers">Designers</Link>
                </div>
                <div className="link item">
                    <Link to="/editorial">Articles</Link>
                </div>
                <div className="link item">
                    <Link to="/about">About</Link>
                </div>
                
                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                    <div className="link item">
                        {this.props.authState? <Link to="/profile">{this.props.userInfo.email}</Link>: <Link to="/account/login">Login</Link>}
                    </div>
                    {this.props.authState ? <div className="link item"> <Link to="#" onClick={this.handleLogOut}>Log out</Link> </div>: null}
                    <div className="link item">
                        <Link to="/account/wishlist">Wishlist</Link>
                    </div>
                    <div className="link item">
                        <Link to="/cart">Cart</Link>
                    </div>
                </div>
            </div>
        )
    }

    render(){
    return (
        <header>
            <nav>
                {this.renderNav()}
            </nav>
        </header>
        )
    }
}

export default Navbar;