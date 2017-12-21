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
            width: '100%',
            textAlign: 'center'
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
            menuWidth: {
                width: '50vw',
            },
            fontStyle: {
                fontFamily: 'Raleway, Roboto, sans-serif',
                textTransform: 'uppercase',
                fontWeight: '300'
            }
        }

        const options = [
            { key: 'clothing', text: 'Clothing', value: 'clothing' },
            { key: 'brands', text: 'Brands', value: 'brands' },
        ]

        return(
            <Menu secondary stackable>
                <Grid className="tablet mobile only container">
                    <Menu secondary stackable>
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

                        {/* <Menu.Item className="link"><Input icon='search' placeholder='Search...' type="text"/></Menu.Item> */}
                    </Menu>
                </Grid>
                
                <Grid className="computer only">
                    <Menu.Item className="link"><Link to="/designers">Designers</Link></Menu.Item>
                    <Menu.Item className="link"><Link to="/editorial">Articles</Link></Menu.Item>
                    <Menu.Item className="link"><Link to="/about">About</Link></Menu.Item>
                    <Menu.Menu position="right">
                        {/* <Menu.Item>
                            <form onSubmit={this.handleSubmit}>
                            <Input onChange={(e, data)=>this.handleChange(e, data)}
                                action={<Dropdown button basic floating options={options} defaultValue='clothing' onChange={(e, data)=>this.handleSearchType(e, data)}/>}
                                icon="search"
                                iconPosition="left"
                                placeholder="Search..."
                            />
                            </form>
                        </Menu.Item> */}
                        <Menu.Item className="link">{this.props.authState? this.authUser() : <Link to="/account/login">Login</Link>}</Menu.Item>
                        <Menu.Item className="link"><Link to="/contact-us">Contact</Link></Menu.Item>
                    </Menu.Menu>
                </Grid>
            </Menu>
        )
    }

    render(){
        const appTitle = {
            "fontSize": "18px",
            "color": "black",
            "textTransform": "uppercase",
            "lineHeight": "1",
            "letterSpacing": ".275em",
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%,-50%)",
            "textAlign": "center",
        }
        const header = {
            "height": "58px",
            "position": "relative",
            "background": "white",
            "top": "0em",
            "borderBottom": "1px solid #bbb"
        }
        return (
            <header style={header}>
                <h1 className="app-title" style={appTitle}><Link className="brand" to="/">streetwear boutiques</Link></h1>
                <nav>
                    {this.renderNav()}
                </nav>
            </header>
        )
    }
}

export default Navbar;