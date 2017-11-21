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
            brandData: false,
        }
    }

    componentWillMount() {
        let brandData = {};
        db.collection("brands").where("approved", "==", true).get().then(res=>{
            res.forEach((brand)=>{
                console.log(brand.id, brand.data())
                return brandData[brand.id] = brand.data()
            })
        }).then(()=>{
            console.log(brandData)
            this.setState({brandData: brandData})
            this.props.storeFeed(brandData);
        }).catch(err=>{console.log(err)})
    }

    componentWillUpdate(prev, next) {
        console.log(prev, next)
    }

    renderBrands(){
        return(
            <div>
                hey
            </div>
        )
    }

    renderPage(){
        if(this.state.brandData){
            return(
                <div className="brand-list">
                    <h1 className="page-title">Designers</h1>
                    <div className="brand-gallery">
                        {this.renderBrands()}
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
            <section id="brand-list">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Designers;