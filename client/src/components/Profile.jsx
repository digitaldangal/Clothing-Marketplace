import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form, Button} from 'semantic-ui-react';
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
                        <h1 className="ui header ">Account Information</h1>
                        <Form>
                            <div id="form-error"></div>
                            <Form.Field>
                                <label>First Name</label>
                                <input required="true" value={this.state.currentUser.first_name} name="first_name" type="text" placeholder="First Name" onChange={(e)=>this.handleChange(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input required="true" value={this.state.currentUser.last_name} name="last_name" type="text" placeholder="Last Name" onChange={(e)=>this.handleChange(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Dispaly Name</label>
                                <input required="true" value={this.state.currentUser.display_name} name="display_name" type="text" placeholder="Username" onChange={(e)=>this.handleChange(e)}/>
                            </Form.Field>
                            <Button secondary>UPDATE</Button>
                        </Form>
                        </div>
                    </div>
                </div>  
            )
        }else if(this.state.uid !== false){
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }else{
            return(
                <div className="profile-page">
                    <div className="profile-links">
                        <h1 className="ui header">{this.state.currentUser ? `Welcome, ${this.state.currentUser.first_name}` : `Welcome`}</h1>
                        <Link to="/profile/brand-signup"><button className="ui button">Register A Brand</button></Link>
                        <button className="ui button" onClick={()=>this.logout(false)} >Logout</button>
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