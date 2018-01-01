import React, { Component } from 'react';
import axios from 'axios';
import SizeChoose from '../options/SizeChoose';
import {Link, Redirect} from 'react-router-dom';
import {Button, Form, Image, Modal} from 'semantic-ui-react';

import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Clothing extends Component {
    constructor(props){
        super(props);
        this.state = {
            clothingData: false,
            brandData: false,
            loadPage: false,
            clothingDataLoaded: false,
            active: false
        }
       this.productDetails = {}
       this.brandDetails = {}
    }


    componentWillMount() {
        console.log(this.props)
        let brandID = Number(this.props.match.params.brand_id);
        let productTitle = this.props.match.params.product_title;
        let productID = Number(this.props.match.params.id);
        let brandRef = db.collection('brands').where('id', "==", brandID);
        let brandData = {};
        let productData = {};
        let brandUID = undefined;

        brandRef.get().then((res)=>{
            if(res.empty){
                this.setState({
                    clothingData: false,
                    dontLoad: true,
                    clothingDataLoaded: false
                })
            }else{
                res.forEach((res)=>{
                    brandUID = res.id;
                    this.brandDetails = res.data();
                    return brandData = res.data();
                })
                db.collection('brands').doc(brandUID).collection('products').where("id", "==", productID).where("title", "==", productTitle).get()
                .then((res)=>{
                    if(res.empty){
                        this.setState({
                            clothingData: false,
                            dontLoad: true,
                            clothingDataLoaded: false
                        })
                    }else{
                        res.forEach((product)=>{
                            this.productDetails = product.data();
                            return productData = product.data();
                        })
                        this.setState({clothingData: productData, clothingDataLoaded: true, loadPage: true})
                    }
                }).catch(err=>(console.log(err)))
                this.setState({brandData: brandData})
            }
        }).catch(err=>{console.log(err)})
    }

    handleChange = (e) => {
        console.log(this.productDetails)
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let productToAdd = this.productDetails;
        let brandDetails = this.brandDetails;
        let button = document.querySelector('#cart-button')
        
        localStorage.setItem('currentTransactionId', JSON.stringify([productToAdd]));

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({active: true})
                button.setAttribute('disabled', 'true');
                if(productToAdd.inventory_total > 0){
                    let data = {
                        shipping: productToAdd.shipping_cost,
                        total: (Number(productToAdd.price) + Number(productToAdd.shipping_cost)),
                        cost: Number(productToAdd.price),
                        description: productToAdd.descritpion,
                        designer: productToAdd.designer,
                        title: productToAdd.title,
                        id: productToAdd.id,
                        size: this.state.size,
                        paypal_email: brandDetails.paypal_email,
                        user_id: user.uid
                    }
                    axios.post('/pay',data,{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'https://streetwearboutiques.com/',
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                        }, mode: 'cors',
                        }).then((res)=>{
                        console.log(res)
                        if(res.status === 200){
                            db.collection('users').doc(user.uid).collection('transactions').doc(new Date().toString()).set({
                                shipping: productToAdd.shipping_cost,
                                total: (Number(productToAdd.price) + Number(productToAdd.shipping_cost)),
                                cost: Number(productToAdd.price),
                                title: productToAdd.title,
                                id: productToAdd.id,
                                size: this.state.size,
                                paypal_email: brandDetails.paypal_email,
                                designer_id: brandDetails.id,
                                product: productToAdd,
                                date_placed: Date().toString()
                            },{merge: true}).then(()=>{
                                window.location.href = res.data;
                            })
                        }
                    }).catch(err=>console.log(err))
                }else{
                    let errorFrom = document.querySelector('#error');
                    let message = ("<pCurrently out of stock</p>")
                    errorFrom.innerHTML = message;
                }
            }else{
                let errorFrom = document.querySelector('#error');
                let message = ("<p><a href='/account/login'>In order to protect all of our users, we ask that you Login or Sign up first before you are allowed to make purchases.</a></p>")
                errorFrom.innerHTML = message;
            }
        })
    }

    handleImageChange=(image)=>{
       let bigImage = document.querySelector('div.imgHolder img');

       bigImage.src = (image);
    }

    handleWishlist = (e, data) =>{
        let productId = data.id;
        let productTitle = data.title;
        let productToAdd = this.state.clothingData;
        let likedItem = e.target;
        
        console.log(e, data)
        
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
                        description: productToAdd.description,
                        id: productId,
                        designerId: this.state.brandData.id
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

    renderAdditonalImages=(clothingData)=>{
        return(
            Object.values(clothingData.additonal_images).map((image, i)=>{
                return(
                    <Image key={i} src={image} />
                )
            })
        )
    }

    renderAdditonalImagesSmall=(clothingData)=>{
        return(
            Object.values(clothingData.additonal_images).map((image, i)=>{
                return(
                    <div className="img" key={i} data-img={image} onClick={(e)=>this.handleImageChange(e.target.dataset.img)} style={{backgroundImage: `url('${image}')`}}>
                    </div> 
                )
            })
        )
    }

    renderPage(){
        if(this.state.clothingData !== false && this.state.clothingDataLoaded !== false){
            const {clothingData, brandData} = this.state;
            return(
                <div className="single-clothing">
                    <div className="page-container ui container">
                        <div className="product-info">
                            <div className="imgHolder">
                                <Modal trigger={<img src={clothingData.main_image} alt={clothingData.description} title={clothingData.title}/>} closeOnDocumentClick={true} closeIcon>
                                    <Modal.Content image>
                                            <Image src={clothingData.main_image} />
                                            {clothingData.hasOwnProperty("additonal_images") ? this.renderAdditonalImages(clothingData) : null}
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className="product-text">
                            <div className={this.state.active ? "ui active inverted dimmer" : "ui disabled inverted dimmer"}>
                                <div className="ui indeterminate text loader">Contacting PayPal. If this last longer than a minute refresh the page</div>
                            </div>
                                <Link to={`/designers/${brandData.name}/${brandData.id}`}><h1 className="ui header">{brandData.name}</h1></Link>
                                <h3 className="ui header">{clothingData.title}</h3>
                                <h3 className="ui header">${clothingData.price}</h3>
                                <p className="text"><span id="details">Details: </span>{clothingData.description}</p>
                                <p>{clothingData.category} - {clothingData.sub_category}</p>
                                <div className="add-to-bag">
                                    <Form required onSubmit={this.handleSubmit}>
                                        <div id="error"></div>
                                        <Form.Group required>
                                            {this.state.loadPage ? <SizeChoose productDetails={this.state.clothingData} handleChange={(e)=>this.handleChange(e)}/> : null}
                                        </Form.Group>
                                        <Button secondary id="cart-button" disabled={clothingData.inventory_total <= 0 ? true : false}>{clothingData.inventory_total <= 0 ? "Sold out" : "Checkout with Paypal"}</Button>
                                    </Form>
                                    <Button secondary data-id={clothingData.id} data-title={clothingData.title} onClick={(e)=>this.handleWishlist(e,e.target.dataset)}><i className="like icon"></i> Wishlist</Button>
                                </div>
                                <a target="_blank" href={`mailto:kamidou95-sb@gmail.com?body=Reason%3A%0A%0AURL%3A%20${this.props.match.url}&Subject=Reporting An Item`}>Report This Item</a>
                                <div className="more-images">
                                    <div className="img" key={clothingData.id} style={{backgroundImage: `url('${clothingData.main_image}')`}} data-img={clothingData.main_image} onClick={(e)=>this.handleImageChange(e.target.dataset.img)}></div> 
                                    {clothingData.hasOwnProperty("additonal_images") ? this.renderAdditonalImagesSmall(clothingData) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.clothingDataLoaded === undefined && this.state.loadPage === false){
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }else if(this.state.dontLoad === true && this.state.clothingDataLoaded === false){
            return(
                <div className="single-brand">
                    <h1 className="ui header title"> 404 - This item was recently deleted or not found!</h1>
                    <Link to='/designers'><Button secondary>Check Out Some Designers</Button></Link>
                    <div className="page-container">
                        <img src="" alt=""/>
                    </div>
                </div>
            )
        }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="single-clothing">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Clothing;