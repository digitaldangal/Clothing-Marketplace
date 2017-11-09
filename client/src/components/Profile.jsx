import React, { Component } from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import BrandService from '../services/BrandService';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid: false,
            redirect: false,
            currentPage: false,
            currentUser: false
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            console.log(user.uid)
            this.setState({uid: user.uid})
        })
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState)
        if(nextProps.authState == true && nextState.uid != false){
            console.log("user logged in")
            return true;
        }else{
            return false;
        }
    }

    componentDidMount() {
        if(this.state.uid != false){
            console.log(this.state.uid)
            console.log("User is signed in")
            firebase.auth().onAuthStateChanged((user)=>{
               if(user){
                   this.setState({
                       redirect: false,
                       currentUser: user.toJSON()
                   })
                   db.collection('users').get()
               }else{
                   this.setState({
                       redirect: true,
                       currentPage: '/'
                   })
               }
            })
        }else{
            this.setState({
                redirect: false,
                currentPage: '/'
            })
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault(); 
        // this.userProfileRef.child(this.props.userInfo.uid).child('brand').child('name').set("Rick Owens")
        // this.userProfileRef.child(this.props.userInfo.uid).child('about').child('content').set(firebase.auth().currentUser.toJSON())
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
        // this.addBrandService.sendData(this.state.brand)
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

    renderPage = () => {
        if(this.props.userInfo != undefined){
            return(
                <div className="profile-page">
                    <h1 className="page-title">Hi, {this.state.uid}</h1>
                    <div className="profile-links">
                        <Link to="/profile/brand-signup"><button className="ui button">Register A Brand</button></Link>
                        <Link to="/profile/product-create"><button className="ui button">Sell A Product</button></Link>
                        <button className="ui button" onClick={this.handleLogOut} >Logout</button>
                        
                    </div>
                </div>
                
            )
        }
    }
    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="profile-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Profile;