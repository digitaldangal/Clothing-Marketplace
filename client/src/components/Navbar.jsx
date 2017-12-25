import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Menu, Grid} from 'semantic-ui-react';
import * as firebase from 'firebase';
var db = firebase.firestore();

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            signedIn: false,
            user: undefined,
            searchType: 'clothing'
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
        const style = {
            textAlign: 'center',
            position: 'relative',
            display: "flex",
            alignItems: "center"
        }
        return(
            <Dropdown className="submenu" text={this.state.user !== undefined ? this.state.user.display_name : `Account`} style={style}>
                <Dropdown.Menu>
                    <Link to="/profile"><Dropdown.Item>Profile</Dropdown.Item></Link>
                    <Dropdown.Divider />
                    {this.state.brandStatus ? <Link to="/profile/brand"><Dropdown.Item>Brand Dashboard</Dropdown.Item></Link> : <Link to="/profile/brand-signup"><Dropdown.Item>Register A Brand</Dropdown.Item></Link>}
                    <Dropdown.Divider />
                    <Link to="/profile/wishlist"><Dropdown.Item>Wishlist</Dropdown.Item></Link>
                    <Dropdown.Divider />
                    <Link to="/profile/transactions"><Dropdown.Item>Transactions</Dropdown.Item></Link>
                    <Dropdown.Divider />
                    <Link to="#" onClick={()=>this.logout(false)}><Dropdown.Item>Logout</Dropdown.Item></Link>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.handleSearch(this.state.searchValue, this.state.searchType)
    }

    handleChange=(e, data)=>{
        let searchValue = data.value;
        this.setState({
            searchValue: searchValue
        })
    }

    handleSearchType=(e, data)=>{
        let searchType = data.value;
        this.setState({
            searchType: searchType
        })
    }
    renderNav(){
        const style = {
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
                        <div className="logo" className="app-title"><Link className="brand" to="/">streetwear boutiques</Link></div>
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
                                <Link to="/contact-us"><Dropdown.Item>Contact</Dropdown.Item></Link>
                                <Dropdown.Divider />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu>
                </Grid>
                
                <Grid className="computer only">
                    <Link to="/designers">Designers</Link>
                    <Link to="/editorial">Articles</Link>
                    <Link to="/clothing">Clothing</Link>

                    <div className="logo" className="app-title"><Link className="brand" to="/">streetwear boutiques</Link></div>

                    {this.props.authState? this.authUser() : <Link to="/account/login">Login</Link>}
                    <Link to="/about">About</Link>
                    <Link to="/contact-us">Contact</Link>
                </Grid>
            </Menu>
        )
    }

    render(){
        const header = {
            "height": "58px",
            "position": "relative",
            "background": "white",
            "top": "0em",
            "maxWidth": "1200px"
        }
        return (
            <header style={header}>
                <nav>
                    {this.renderNav()}
                </nav>
            </header>
        )
    }
}

export default Navbar;