import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class ApprovedBrand extends Component {
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
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('brands').doc(user.uid).get().then((res)=>{
                    if(res.exists){
                        console.log(res.data())
                    }
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
        console.log(nextProps, nextState)
        if(nextProps.authState && nextState.uid === false){
            console.log("update")
            return true;
        }else{
            console.log(" no update")
        }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="brand-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                <h1 className="page-title">{this.props.useruid}</h1>
            </section>
        )
    }
}

export default ApprovedBrand;
