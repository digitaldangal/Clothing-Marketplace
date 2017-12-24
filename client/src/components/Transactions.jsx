import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Spinner from './Spinner';
import Transaction from './Transaction';
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
            transactionsLoaded: false,
            allTransactions: false
        }
    }

    componentDidMount() {
        let allTransactions = {}
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                db.collection('payments').doc(user.uid).get().then((res)=>{
                    console.log(res.data())
                    allTransactions = res.data()
                    this.setState({
                        allTransactions: allTransactions,
                        currentPage: user
                    })
                }).then(()=>{
                    var t0 = performance.now();
                    this.sortTransactions();
                    var t1 = performance.now();
                    console.log("Sorting transactions took " + (t1 - t0) + " milliseconds.")
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

    /* Grabs the date of each transaction, to be sorted into an array. From there a new object refrence is created with
    the transactions sorted by most recent
    */
    sortTransactions = () => {
        let transactions = this.state.allTransactions;
        let dateHolder = [];
        let sortedArray = [];
        
        Object.values(transactions).map((transaction, i)=>{
            return dateHolder.push([new Date(transaction.date), i]);
        })
        this.sortDateArray(dateHolder, sortedArray);
    }
    
    sortDateArray = (dateHolder, sortedArray) => {
        let newTransactionObject = {};
        sortedArray = dateHolder.sort(function(min, max){
            return max[0] - min[0];
        })
        sortedArray.map((item, x)=>{
            return newTransactionObject[`Transaction ${x}`] = Object.values(this.state.allTransactions)[item[1]]
        })
        this.setState({
            newTransactionObject: newTransactionObject,
            transactionsLoaded: true,
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="profile-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                <div className="single-clothing">
                    <div className="page-container ui container">
                        <h1 className="ui header">Order History</h1>
                        {this.state.transactionsLoaded ? <Transaction transactionData={this.state.newTransactionObject}/> : <Spinner />}
                    </div>
                </div>
            </section>
        )
    }
}

export default Transactions;