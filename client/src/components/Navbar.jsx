import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Input} from 'semantic-ui-react';
import * as firebase from 'firebase';
var db = firebase.firestore();

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            user: undefined,
        }
    }
    
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            let userInfo = {};
            if(user){
                this.setState({signedIn: true})
                
                db.collection('brands').doc(user.uid).get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({
                            uid: user.uid,
                            brandStatus: true,
                            redirect: false,
                            currentPage: '',
                        })
                    }
                }).then(()=>{
                    db.collection('users').doc(user.uid).get().then((res)=>{
                        userInfo = res.data();
                        this.setState({user: userInfo});
                    })
                })
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

    logout=(authChange)=>{
        console.log("logging out")
        this.props.authStateChange(authChange)
    }

    authUser=()=>{
        return(
            <Dropdown text={this.state.user !== undefined ? this.state.user.display_name : `Account`}>
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    {this.state.brandStatus ? <Dropdown.Item><Link to="/profile/brand">Brand Dashboard</Link></Dropdown.Item> : null}
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/profile/edit">Edit Account</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/profile/history">Transactions</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="#" onClick={()=>this.logout(false)}>Log out</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    renderNav(){
        const style = {
            menuWidth: {
                width: '50vw',
            }
        }
        return(
            <div className='ui secondary stackable menu'>
                <div className="ui grid tablet mobile only container">
                    <div className='ui secondary stackable menu'>
                        <div className="item logo">
                            <Link className="brand" to="/"><img className="logo" src="/main/images/sb-logo.svg" alt="StreetwearBoutiques Logo"/></Link>
                        </div>

                        <Dropdown icon='sidebar' closeOnBlur className='hamburger'>
                            <Dropdown.Menu style={style.menuWidth}>
                                <Dropdown.Item><Link to="/designers">Designers</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item><Link to="/editorial">Articles</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item><Link to="/about">About</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>{this.props.authState? this.authUser() : <Link to="/account/login">Login</Link>}</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item><Link to="/cart">Cart</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item><Link to="/contact-us">Contact</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className="link item">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..."/>
                                <i className="search icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="ui grid computer only">
                    <div className="item">
                        <Link className="brand" to="/"><img className="logo" src="/main/images/sb-logo.svg" alt="StreetwearBoutiques Logo"/></Link>
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
                        <div className="link item">
                            <Link to="/contact-us">Contact</Link>
                        </div>
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