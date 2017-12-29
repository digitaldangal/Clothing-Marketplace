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
                <div className="ui grid computer only">
                    <ListOfBrands />
                </div>
                {this.state.clothingDataLoaded ? <Clothes /> : null}
            </section>
        )
    }
}

export default AllClothing;