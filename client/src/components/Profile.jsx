import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid: false,
            redirect: false,
            currentPage: null,
            currentUser: false,
            brandCreated: null,
            brandStatus: null
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                console.log(`Welcome ${user.email}`);
                db.collection('users').doc(user.uid).get().then(res=>{
                    this.setState({currentUser: res.data()})
                }).catch(err=>console.log(err))

                db.collection('brands').doc(user.uid).get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({
                            brandStatus: true,
                            brandCreated: true
                        })
                    }else if(res.exists && res.data().approved === false){
                        this.setState({
                            brandCreated: true,
                            brandStatus: false
                        })
                    }
                })
                this.setState({
                    uid: user.uid,
                    redirect: false,
                    currentPage: ''
                })
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/'
                }) 
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log(nextProps, nextState)
        if(nextProps.authState === true && nextState.uid !== false){
            console.log("user logged in")
            return true;
        }else{
            return false;
        }
    }

    logout=(authChange)=>{
        console.log("logging out")
        this.props.authStateChange(authChange)
    }

    brandAccess(){
        return(
            <div className="profile-links">
                <Link to="/profile/brand"><button className="ui button">Brand Page</button></Link>
                <Link to="/profile/product-create"><button className="ui button">List A Item</button></Link>
                <button className="ui button" onClick={()=>this.logout(false)} >Logout</button>
            </div>
        )
    }

    brandRegister(){
        return(
            <div className="profile-links">
                <Link to="/profile/brand-signup"><button className="ui button">Register A Brand</button></Link>
                <button className="ui button" onClick={()=>this.logout(false)} >Logout</button>
            </div>
        )
    }

    renderPage = () => {
        if(this.state.uid !== false){
            return(
                <div className="profile-page">
                    <h1 className="page-title">{this.state.currentUser ? `Welcome, ${this.state.currentUser.first_name}` : `Welcome`}</h1>
                    {this.state.brandStatus ? this.brandAccess() : this.brandRegister()}
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