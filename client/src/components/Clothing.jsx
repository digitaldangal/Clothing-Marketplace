import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Clothing extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        // /designers/:brand/:brand_id/:product_title
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    rendePage(){
        return(
            <h1>Clothings</h1>
        )
        // if(){

        // }else{
        //     return(
        //         <div className="ui active inverted dimmer">
        //             <div className="ui indeterminate text loader">Preparing Files</div>
        //         </div>
        //     )
        // }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <div>
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.rendePage()}
            </div>
        )
    }
}

export default Clothing;