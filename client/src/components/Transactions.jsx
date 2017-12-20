import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Transactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            uid: false,
            redirect: false,
            currentPage: null,
            currentUser: false,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).collection('transactions').get().then((res)=>{
                    res.forEach((transaction)=>{
                        console.log(transaction.data())
                    })
                })
                .catch(err=>console.log(err))
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/account/login' 
                }) 
            }
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="profile-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                <div className="single-clothing">
                    <div className="page-container ui container">
                        <h1 className="ui header">Previous Transactions</h1>
                    </div>
                </div>
            </section>
        )
    }
}

export default Transactions;