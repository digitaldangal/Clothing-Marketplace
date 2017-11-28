import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Input, Menu, Grid} from 'semantic-ui-react';
import * as firebase from 'firebase';
var db = firebase.firestore();

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
            let userInfo = {};
            if(user){
                let userCartRef = db.collection('users').doc(user.uid).collection('cart');
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
            <Dropdown className="submenu" text={this.state.user !== undefined ? this.state.user.display_name : `Account`}>
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    {this.state.brandStatus ? <Dropdown.Item><Link to="/profile/brand">Brand Dashboard</Link></Dropdown.Item> : <Dropdown.Item><Link to="/profile/brand-signup">Register A Brand</Link></Dropdown.Item>}
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/profile/edit">Edit Account</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to="/profile/wishlist">Wishlist</Link></Dropdown.Item>
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
            },
            fontStyle: {
                fontFamily: 'Raleway, Roboto, sans-serif',
                textTransform: 'uppercase',
                fontWeight: '300'
            }
        }
        return(
            <Menu secondary stackable>
                <Grid className="tablet mobile only container">
                    <Menu secondary stackable>
                        <Menu.Item className="logo"><Link className="brand" to="/"><img className="logo" src="/main/images/sb-logo.svg" alt="StreetwearBoutiques Logo"/></Link></Menu.Item>

                        <Dropdown icon='sidebar' closeOnBlur className='hamburger'>
                            <Dropdown.Menu style={style.menuWidth}>
                                <Link to="/"><Dropdown.Item>Home</Dropdown.Item></Link>
                                <Dropdown.Divider />
                                <Link to="/designers"><Dropdown.Item>Designers</Dropdown.Item></Link>
                                <Dropdown.Divider />
                                <Link to="/editorial"><Dropdown.Item>Articles</Dropdown.Item></Link>
                                <Dropdown.Divider />
                                <Link to="/about"><Dropdown.Item>About</Dropdown.Item></Link>
                                <Dropdown.Divider />
                               {this.props.authState? this.authUser() : <Link to="/account/login"> <Dropdown.Item>Login</Dropdown.Item></Link>}
                                <Dropdown.Divider />
                                <Link to="/profile/cart"><Dropdown.Item><i className="shopping bag icon">({this.props.shopping_cart})</i></Dropdown.Item></Link>
                                <Dropdown.Divider />
                                <Link to="/contact-us"><Dropdown.Item>Contact</Dropdown.Item></Link>
                                <Dropdown.Divider />
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item className="link"><Input icon='search' placeholder='Search...' type="text"/></Menu.Item>
                    </Menu>
                </Grid>
                
                <Grid className="computer only">
                    <Menu.Item className="logo"><Link className="brand" to="/"><img className="logo" src="/main/images/sb-logo.svg" alt="StreetwearBoutiques Logo"/></Link></Menu.Item>
                    <Menu.Item className="link"><Link to="/designers">Designers</Link></Menu.Item>
                    <Menu.Item className="link"><Link to="/editorial">Articles</Link></Menu.Item>
                    <Menu.Item className="link"><Link to="/about">About</Link></Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item><Input icon='search' placeholder='Search...' type="text"/></Menu.Item>
                        <Menu.Item className="link">{this.props.authState? this.authUser() : <Link to="/account/login">Login</Link>}</Menu.Item>
                        <Menu.Item className="link"><Link to="/profile/cart"><i className="shopping bag icon" style={{display: 'inline'}}> ({this.props.shopping_cart})</i></Link></Menu.Item>
                        <Menu.Item className="link"><Link to="/contact-us">Contact</Link></Menu.Item>
                    </Menu.Menu>
                </Grid>
            </Menu>
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