import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Clothes from './Clothes';
import ListOfBrands from './ListOfBrands';
import firebase from '../config/firebase';
var db = firebase.firestore();

class AllClothing extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: '',
            clothingData: false,
            clothingDataLoaded: false
        }
    }

    componentDidMount() {
        let clothing = {}
        db.collection("products").where("deleted", "==", false).orderBy("created_date",'desc').limit(50).onSnapshot((res)=>{
            res.forEach((clothes)=>{
                console.log(clothes.data());
                return clothing[clothes.data().title] = clothes.data();
            })
            this.setState({
                clothingData: clothing,
                clothingDataLoaded: true
            })
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="all-clothing">
                {redirect ? <Redirect to={currentPage} /> : null}
                {/* <div className="ui grid computer only">
                    <ListOfBrands />
                </div> */}
                <div className="ui text menu">
                    <a href='search/products/outerwear' className="item">outerwear</a>
                    <a href='/editorial/archive/tops' className="item">tops</a>
                    <a href='/editorial/archive/bottoms' className="item">bottoms</a>
                    <a href='/editorial/archive/accessories' className="item">accessories</a>
                </div>
                <div className="page-container ui container">
                    {this.state.clothingDataLoaded ? <Clothes clothingData={this.state.clothingData}/> : null}
                </div>
            </section>
        )
    }
}

export default AllClothing;