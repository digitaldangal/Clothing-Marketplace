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
            brandData: false,
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('brands').doc(user.uid).get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({
                            brandStatus: true,
                            brandCreated: true,
                            brandData: res.data(),
                            uid: user.uid,
                            redirect: false,
                            currentPage: '',
                        })
                    }else if(res.exists && !res.data().approved){
                        this.setState({
                            redirect: true,
                            currentPage: '/profile'
                        })
                    }
                })
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/account/login'
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

    renderPage(){
        if(this.state.brandData){
            return(
                <div className="brand-page">
                    <h1 className="page-title">{this.state.brandData.name}</h1>
                    <div className="product-gallery">
                        
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
            <section id="brand-page">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default ApprovedBrand;
