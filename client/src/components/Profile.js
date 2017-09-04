import React, { Component } from 'react';
import firebase from '../config/firebase';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.rootRef = firebase.database().ref();
        this.userProfileRef = this.rootRef.child('Users')
    }
    componentDidMount() {
       
    }
    handleSubmit=(e)=>{
        e.preventDefault(); 
        this.userProfileRef.child(this.props.userInfo.uid).child('brand').child('name').set("Rick Owens")
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <div className="profile-page">
                <h1 className="page-title">Profile Page</h1>
                <div className="edit-form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile;