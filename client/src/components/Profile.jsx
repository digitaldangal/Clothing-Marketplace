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
            brandStatus: false
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

    renderPage(){
        if((this.state.uid !== false && this.state.brandCreated) && this.state.brandStatus){
            return(
                <div className="profile-page">
                    <h1 className="page-title">{this.state.currentUser ? `Welcome, ${this.state.currentUser.first_name}` : `Welcome`}</h1>
                    <div className="profile-links">
                        <Link to="/profile/brand"><button className="ui button">Brand Page</button></Link>
                        <Link to="/profile/product-create"><button className="ui button">List A Item</button></Link>
                        <button className="ui button" onClick={()=>this.logout(false)} >Logout</button>
                    </div>
                    <div className="page-contianer ui container">
                    <div className="register-form">
                            <h1 className="ui header ">Create An Account</h1>
                            <form className="ui form">
                                <div id="form-error"></div>
                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                                First Name
                                            </div>
                                            <input required="true" name="first_name" type="text" placeholder="First Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                                Last Name
                                            </div>
                                            <input required="true" name="last_name" type="text" placeholder="Last Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                            Display Name
                                            </div>
                                            <input required="true" name="display_name" type="text" placeholder="Username" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                            Email
                                            </div>
                                            <input required="true" name="email" type="text" placeholder="Email" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                                Password
                                            </div>
                                            <input required="true" name="password" type="password" placeholder="Password" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui labeled input">
                                            <div className="ui label">
                                                Confirm Password
                                            </div>
                                            <input required="true" name="password_confirm" type="password" placeholder="Confirm Password" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <button className="ui primary button" type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>  
            )
        }else if(this.state.uid !== false){
            return(
                <div className="profile-page">
                    <div className="profile-links">
                        <h1 className="ui header">{this.state.currentUser ? `Welcome, ${this.state.currentUser.first_name}` : `Welcome`}</h1>
                        <Link to="/profile/brand-signup"><button className="ui button">Register A Brand</button></Link>
                        <button className="ui button" onClick={()=>this.logout(false)} >Logout</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
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