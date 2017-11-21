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
            singleBrandData: false,
        }
    }
    componentWillMount() {
        let brandDatba = {};
        let brandId = Number(this.props.match.params.brand_id);
        db.collection("brands").where("id", "==", brandId).get().then(res=>{
            console.log(res)
            res.forEach((brand)=>{
                console.log(brand.data())
            }).catch(err=>{console.log(err)}) 
        }).catch(err=>{console.log(err)})  
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
        if(this.state.singleBrandData && this.state.singleBrandDataLoaded){
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