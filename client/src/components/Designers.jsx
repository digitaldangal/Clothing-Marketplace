import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Designers extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: null,
            currentUser: false,
        }
    }

    componentWillMount() {
        
    }

    render(){
        return(
            <div className="designers-list">
                <h1>Designers</h1>
            </div>
        )
    }
}

export default Designers;