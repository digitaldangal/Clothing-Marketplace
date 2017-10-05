import React, { Component } from 'react';
import firebase from '../config/firebase';
import BrandService from '../services/BrandService'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            brand: undefined
        }
        this.rootRef = firebase.database().ref();
        this.userProfileRef = this.rootRef.child('Users')
        this.addBrandService = new BrandService();
    }
    
    handleSubmit=(e)=>{
        e.preventDefault(); 
        // this.userProfileRef.child(this.props.userInfo.uid).child('brand').child('name').set("Rick Owens")
        // this.userProfileRef.child(this.props.userInfo.uid).child('about').child('content').set(firebase.auth().currentUser.toJSON())
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
        this.addBrandService.sendData(this.state.brand)
    }

    handleChange=(e)=>{
        this.setState({
             brand: e.target.value
        })
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
    render(){
        return(
            <div className="profile-page">
                <h1 className="page-title">Profile Page</h1>
                <div className="edit-form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="brand name" onChange={(e)=>this.handleChange(e)}/>
                        <input type="submit" value="submit"/>
                    </form>
                    <button onClick={this.handleLogOut}>Logout</button>
                </div>
            </div>
        )
    }
}

export default Profile;