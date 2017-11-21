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
        }
    }

    componentWillMount() {
        let brandId = Number(this.props.match.params.brand_id);
        let brandInfo = {};
        // db.collection('brands').doc(user.uid).get().then((res)=>{
        //     if(res.exists && res.data().approved){
        //         this.setState({
        //             brandStatus: true,
        //             brandCreated: true,
        //             brandData: res.data(),
        //             uid: user.uid,
        //             redirect: false,
        //             currentPage: '',
        //         })
        //         let productRef = db.collection("brands").doc(this.state.uid).collection("products");
        //         let productData = {}
        //         productRef.orderBy("title").get().then((res)=>{
        //             res.forEach((product)=>{
        //                 return productData[product.id] = product.data()
        //             })
        //         }).then(()=>{
        //             this.setState({productData: productData})
        //         }).catch(err=>{console.log(err)})
        //     }else if(res.exists && !res.data().approved){
        //         this.setState({
        //             redirect: true,
        //             currentPage: '/profile'
        //         })
        //     }
        // })
        db.collection("brands").where("id", "==", brandId).get().then(res=>{
            if(res.empty == false){
                this.setState({
                    redirect: false,
                    currentPage: '',
                })
                console.log(res)
                res.forEach((brand)=>{
                    console.log(brand.id)
                    return brandInfo = brand.data();
                })
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/designers'
                })
            }
        }).then(()=>{
            console.log("hiiiiiiiiii")
            this.setState({
                singleBrandData: brandInfo,
                singleBrandDataLoaded: true
            })
        }).catch(err=>console.log(err))
    }

    componentWillUpdate(prev, next) {
        console.log(prev, next)
    }

    renderBrands(){
        if(this.state.singleBrandData){
            return(
                <div className="ui link cards">
                    {Object.values(this.state.brandData).map((brand, i)=>{
                        return(
                            <div className="card brandCard" key={i}>
                                <div className="content">
                                    <div className="header title">{brand.name}</div>
                                        <div className="meta">
                                            {brand.website != null ? <a href={brand.website} target="_blank">{brand.website}</a> : <a href="#">No Website</a>}
                                        </div>
                                    <div className="description">
                                        <p className="brandText">{brand.description}</p>
                                    </div>
                                </div>
                                <div className="ui bottom attached button">
                                    <Link to={`/designers/${brand.name}`}>View Brand</Link>
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

        return(
            <h1>hey</h1>
        )
        /* if(this.state.singleBrandData && this.state.singleBrandDataLoaded){
            return(
                <div className="single-brand">
                    <h1 className="ui header">{this.state.singleBrandData.name}</h1>
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
        } */
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