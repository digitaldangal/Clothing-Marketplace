import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Designer extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentPage: null,
            currentUser: false,
            brandUid: false,
            singleBrandData: false,
            singleBrandDataLoaded: false,
            productData: false,
            productDataLoaded: false,
        }
    }

    componentWillMount() {
        let brandId = Number(this.props.match.params.brand_id);
        let brandInfo = {};
        db.collection("brands").where("id", "==", brandId).get().then(res=>{
            if(res.empty === false){
                this.setState({
                    redirect: false,
                    currentPage: '',
                })
                res.forEach((brand)=>{
                    this.setState({brandUid: brand.id})
                    return brandInfo = brand.data();
                })
                
                let productRef = db.collection("brands").doc(this.state.brandUid).collection("products");
                let productData = {}
                productRef.orderBy("title").get().then((res)=>{
                    if(res.empty === false){
                        res.forEach((product)=>{
                            return productData[product.id] = product.data()
                        })
                        this.setState({
                            productData: productData,
                            productDataLoaded: true,
                            singleBrandData: brandInfo,
                            singleBrandDataLoaded: true
                        })
                    }else{
                        this.setState({
                            singleBrandData: brandInfo,
                            singleBrandDataLoaded: true,
                            productData: false,
                            productDataLoaded: false, 
                        })
                    }
                }).then(()=>{
                }).catch(err=>{console.log(err)})
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/designers'
                })
            }
        }).catch(err=>console.log(err))
    }

    handleAddToWishlist = (e) =>{
        let productId = e.id;
        let productTitle = e.title;
        let productToAdd = this.state.productData[productTitle]
        console.log(productTitle, productToAdd)

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                db.collection('users').doc(user.uid).collection('wishlist').doc(productTitle).set({
                    productToAdd
                },{merge: true})
            }else{

            }
        })
    }

    renderBrands(){
        if(this.state.productData){
            return(
                <div className="ui link cards">
                {Object.values(this.state.productData).map((product, i)=>{
                    return(
                        <div className="card" key={i}>
                            <Link to={`/designers/${this.state.singleBrandData.name}/${this.state.singleBrandData.id}/${product.title}/${product.id}`}>
                                <div className="image">
                                    <img src={product.main_image} alt=""/>
                                </div>
                            </Link>    
                                <div className="content">
                                    {/* <div className="header">{product.title}</div> */}
                                    <div className="header">{this.state.singleBrandData.name}</div>
                                        {product.inventory_total === 0 ? (<p id="soldout">SOLD OUT</p>) : null}
                                    <div className="description links">
                                        {product.title}
                                    </div>
                                    <div className="meta links">
                                        <Link to={`/search/products/${product.category.toLowerCase()}`}>{product.category}</Link>
                                        <a>${product.price}</a>
                                        <i className="like icon" title="add to wishlist" data-id={product.id} data-title={product.title} onClick={(e)=>this.handleAddToWishlist(e.target.dataset)}></i>
                                    </div>
                                </div>
                        </div> 
                    )
                })}
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

    renderPage(){
        if(this.state.productDataLoaded && this.state.singleBrandDataLoaded){
            return(
                <div className="single-brand">
                    <h1 className="ui header">{this.state.singleBrandData.name}</h1>
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

export default Designer;