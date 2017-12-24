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
            transactionsLoaded: false
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
                        transactionsLoaded: true
                    })
                }).then(()=>{
                    this.sortTransactions();
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

    sortTransactions = () => {
        var t0 = performance.now();
        let transactions = this.state.allTransactions;
        let dateHolder = [];
        let sortedArray = [];

        /* Grabs the date of each transaction, to be sorted into an array. From there a new object refrence is created with
        the transactions sorted by most recent
        */
        Object.values(transactions).map((transaction, i)=>{
            dateHolder.push([new Date(transaction.date), i])
        })

        this.sortDateArray(dateHolder, sortedArray);

        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    }

    sortDateArray = (dateHolder, sortedArray) => {
        sortedArray = dateHolder.sort(function(min, max){
            return max[0] - min[0];
        })
        console.log(sortedArray)
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