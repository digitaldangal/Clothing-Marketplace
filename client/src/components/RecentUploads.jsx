import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class RecentUploads extends Component {
    constructor(props){
        super(props);
        this.state = {
            singleBrandData: false,
            singleBrandDataLoaded: false,
            productData: false,
            productDataLoaded: false,
        }
    }

    componentDidMount() {
        let recentUploads = {}
        db.collection("products").orderBy("created_date",'desc').limit(10).get().then(res=>{
            res.forEach((upload)=>{
                console.log(upload.data())
            })
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="single-brand">
                {redirect ? <Redirect to={currentPage} /> : null}
            </section>
        )
    }
}

export default RecentUploads;