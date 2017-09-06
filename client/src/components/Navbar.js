import React, { Component } from 'react';
import * as firebase from 'firebase';
import {DropDownMenu, AppBar, Tab, Tabs, Drawer, MenuItem} from 'material-ui';
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
            <AppBar 
            title="Copped"
            zDepth={2}
            onLeftIconButtonTouchTap={()=>this.menuToggle()}
            >
            <Drawer className="side-menu" style={{display: 'none'}}/>
            <Tabs children={true}>
                <Tab label="Item 1" />
                <Tab label="Item 2" />
                <Tab label="Item 3" />
                <Tab label="Item 4" />
            </Tabs>
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="All Broadcasts" />
                    <MenuItem value={2} primaryText="All Voice" />
                    <MenuItem value={3} primaryText="All Text" />
                    <MenuItem value={4} primaryText="Complete Voice" />
                    <MenuItem value={5} primaryText="Complete Text" />
                    <MenuItem value={6} primaryText="Active Voice" />
                    <MenuItem value={7} primaryText="Active Text" />
                </DropDownMenu>
            </AppBar>
        </header>
        )
    }
}

export default Navbar
// {this.props.authState ? this.renderAuthNav() : this.renderNav()}