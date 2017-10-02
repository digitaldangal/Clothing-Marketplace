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
                    <img src="/images/brand.png" alt="Copped Logo"/>
                </div>
                <div className="item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search..."/>
                        <i className="search icon"></i>
                    </div>
                </div>
                {/* Left Side */}
                <Link to="#"><button>Designers</button></Link>
                <Link to="#"><button>Articles</button></Link>
                <Link to="#"><button>Search</button></Link>
                {/* Mid */}
                {/* Brand Logo */}
                <Link to="/"><button>Copped</button></Link>
                {/* Right Side */}
                <Link to="#"><button>Wishlist</button></Link>
                <Link to="#"><button>Cart</button></Link>
                <Link to="#"><button>About</button></Link>
                <Link to="/account/login">Login</Link>
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