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
                return clothing[clothes.data().title] = clothes.data();
            })
            this.setState({
                clothingData: clothing,
                clothingDataLoaded: true
            })
        })
    }
    
    
    handleAddToWishlist=(e, data)=>{
        let productId = data.id;
        let productTitle = data.title;
        let productToAdd = this.state.clothingData[productTitle]
        let likedItem = e.target;
        
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                if(localStorage.getItem(productId) === "red"){
                    localStorage.removeItem(productId);
                    likedItem.style.color = "gray";
                    db.collection('users').doc(user.uid).collection('wishlist').doc(productTitle).delete()
                    .then(res=>console.log(res)).catch(err=>(console.log(err)))
                }else{
                    likedItem.style.color = "red";
                    db.collection('users').doc(user.uid).collection('wishlist').doc(productTitle).set({
                        main_image: productToAdd.main_image,
                        title: productTitle,
                        designer: productToAdd.designer,
                        price: productToAdd.price,
                        category: productToAdd.category,
                        id: productId,
                        designerId: productToAdd.clothing_label.id
                    },{merge: true})
                    .then(()=>{
                        localStorage.setItem(productId, "red")
                    })
                    .catch(err=>(console.log(err)))
                }
            }else{
                alert("You must be signed in first to do that!")
            }
        })
    }

    queryClothing = (category) =>{
        console.log(category);
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
                    <a onClick={(e)=>this.queryClothing(e.target.innerText)} className="item">outerwear</a>
                    <a onClick={(e)=>this.queryClothing(e.target.innerText)} className="item">tops</a>
                    <a onClick={(e)=>this.queryClothing(e.target.innerText)} className="item">bottoms</a>
                    <a onClick={(e)=>this.queryClothing(e.target.innerText)} className="item">accessories</a>
                </div>
                <div className="page-container ui container">
                    {this.state.clothingDataLoaded ? <Clothes clothingData={this.state.clothingData} handleAddToWishlist={(e, data)=>this.handleAddToWishlist(e, data)}/> : null}
                </div>
            </section>
        )
    }
}

export default AllClothing;