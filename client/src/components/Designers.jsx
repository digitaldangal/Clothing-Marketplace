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
        if(this.props.brandDataLoaded === false){
            db.collection("brands").where("approved", "==", true).orderBy("name").get().then(res=>{
                res.forEach((brand)=>{
                    console.log(brand.id, brand.data())
                    return brandData[brand.id] = brand.data()
                })
            }).then(()=>{
                console.log(brandData)
                this.setState({brandData: brandData})
                this.props.storeFeed(brandData);
            }).catch(err=>{console.log(err)})
        }else{
            let brandDataFeed = this.props.brandData;
            this.setState({
                brandData: brandDataFeed
            })
        }
    }

    componentWillUpdate(prev, next) {
        console.log(prev, next)
    }

    renderBrands(){
        if(this.state.brandData){
            return(
                <div className="ui cards">
                    {Object.values(this.state.brandData).map((brand, i)=>{
                        return(
                            <div className="card" key={i}>
                                <div className="content">
                                    <div className="header">{brand.name}</div>
                                        <div className="meta">
                                            <a href={brand.website} target="_blank">{brand.website}</a>
                                        </div>
                                    <div className="description">
                                        {brand.description}
                                    </div>
                                </div>
                                <div className="extra content">
                                    <span className="right floated">
                                        Size: {brand.size}
                                    </span>
                                    <span className="left floated">
                                        <i className="shop icon"></i>
                                        {brand.item_count}
                                    </span>
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
        if(this.state.brandData){
            return(
                <div className="brand-list">
                    <h1 className="ui header">Designers</h1>
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