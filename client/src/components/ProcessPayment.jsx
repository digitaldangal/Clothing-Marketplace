import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class ProcessPayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: null,
            productData: false,
            productDataLoaded: false,
            cartLength: 0
        }
    }

    componentDidMount() {
       console.log(this.props)
       let user = firebase.auth().currentUser;
       axios.post(`/process${this.props.location.search}`)
       .then((res)=>{
           if(res.status === 200 || res.status === 400){
               console.log("payment complete")
               firebase.auth().onAuthStateChanged((user)=>{
                   if(user){
                        db.collection('users').doc(user.uid).collection('transactions').doc(Date().toString()).set({
                            params: this.props.location.search,
                        }).catch(err=>(console.log(err)))
                   }
               })
           }
       }).catch((err)=>(console.log(err)))
       .then(()=>{
            axios.post('/newPayment',{
                payment_info: this.props.location.search,
                user: user.uid,
                email: user.email
            }).catch(err=>{
                console.log(err)
            })
            this.setState({
                redirect: true,
                currentPage: '/profile'
            });
       }).catch(err=>{console.log(err)})
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="cart">
                {redirect ? <Redirect to={currentPage} /> : null}
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Finalizing Order</div>
                </div>
            </section>
        )
    }
}

export default ProcessPayment;