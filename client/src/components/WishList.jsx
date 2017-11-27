import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Wishlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: null,
            productData: false,
            productDataLoaded: false,
        }
    }

    componentWillMount() {
        let productInfo = {};
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({redirect: false})
                db.collection('users').doc(user.uid).collection('wishlist').limit(40).get().then((res)=>{
                    if(res.empty === false){
                        res.forEach((product)=>{
                            console.log(product.data())
                        })
                    }else{
                        return null;
                    }
                }).then(res=>console.log(res)).catch(err=>console.log(err));
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/account/login'
                })
            }
        })
    }

    renderPage(){
        if(this.state.productDataLoaded && this.state.singleBrandDataLoaded){
            return(
                <div className="single-brand">
                    <h1 className="ui header">Wishlist</h1>
                    <h3 className="ui header">{this.state.singleBrandData.description}</h3>
                    <div className="page-container">
                        {this.renderBrands()}
                    </div>
                </div>
            )
        }else if(this.state.productDataLoaded === false && this.state.singleBrandData){
            return(
                <div className="single-brand">
                    <h1 className="ui header title">{this.state.singleBrandData.name}</h1>
                    <h3 className="ui header">{this.state.singleBrandData.description}</h3>
                    <div className="page-container">
                        <h3 className="ui header">Either this brand has sold out or no products are available yet.</h3>
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
            <section id="single-brand">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Wishlist;