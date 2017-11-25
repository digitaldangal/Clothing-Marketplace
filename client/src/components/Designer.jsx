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
            if(res.empty == false){
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
                    if(res.empty == false){
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

    renderBrands(){
        if(this.state.productData){
            return(
                <div className="ui link cards">
                {Object.values(this.state.productData).map((product, i)=>{
                    return(
                        <div className="card" key={i}>
                            <div className="image">
                                <img src={product[Object.keys(product)[0]]} alt=""/>
                            </div>
                            <div className="content">
                                <div className="header">{product.title}</div>
                                    <div className="meta links">
                                        <a>{product.category}</a>
                                        <a>${product.price}</a>
                                        <a>Size: {product.size}</a>
                                    </div>
                                <div className="description links">
                                    <Link to={`/designers/${this.state.singleBrandData.name}/${this.state.singleBrandData.id}`}><button className="ui button">View Item</button></Link>
                                    <Link to={`/designers/${this.state.singleBrandData.name}/${this.state.singleBrandData.id}`}><button className="ui button">Add to Cart</button></Link>
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
        }else if(this.state.productDataLoaded == false && this.state.singleBrandData){
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