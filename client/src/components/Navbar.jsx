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
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.setState({signedIn: true})
            }else{
                this.setState({signedIn: false}) 
            }
        })
    }

    componentWillUpdate(prevState, nextState) {
        if(prevState.authState === true && nextState.signedIn === true){
            return false;
        }
    }

    authUser=()=>{
        return(
                <div className="ui simple dropdown">
                    <div className="text"><Link to="#">{this.props.userInfo.email}</Link></div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <div className="item"><Link to="/profile">Account Details</Link></div>
                        <div className="item"><Link to="/profile/history">Transactions</Link></div>
                        <div className="item"><Link to="/profile/wishlist">Wishlist</Link></div>
                        {/* <div className="item"><Link to="#" onClick={this.handleLogOut}>Log out</Link></div> */}
                    </div>
                </div>
        )
    }

    renderNav(){
        return(
            <div className='ui secondary stackable menu'>
                <div className="item">
                    <Link className="brand" to="/"><img className="logo" src="/main/images/streetwearboutiques_logo.svg" alt="StreetwearBoutiques Logo"/></Link>
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
                        {this.props.authState? this.authUser() : <Link to="/account/login">Login</Link>}
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