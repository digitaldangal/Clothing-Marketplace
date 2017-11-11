import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class ApprovedBrand extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount() {
        
    }
    componentWillUpdate() {
        
    }
    //Check status of approved brand


    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="brand-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                <h1 className="page-title">Brand Name</h1>
            </section>
        )
    }
}

export default ApprovedBrand;
