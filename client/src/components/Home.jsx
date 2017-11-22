import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Article from './Article';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleData: false,
            featuredBrand: false,
        }
    }

    componentWillMount() {
        let articleRef = db.collection("articles").doc("article_0");
        let featBrandRef = articleRef.collection("brand").doc("brand_1");
        let articleData = {};
        let brandData = {};

        articleRef.get().then((res)=>{
            console.log(res.data());
            return articleData = res.data();
        }).then(()=>{
            featBrandRef.get().then((res)=>{
                console.log(res.data());
                return res;
            }).then((res)=>{
                db.collection("brands").where("id", "==", res.data().id).get().then((res)=>{
                    res.forEach((brand)=>{
                        console.log(brand.data());
                        return brandData = brand.data();
                    })
                    this.setState({featuredBrand: brandData})
                }).catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
            this.setState({articleData: articleData})
        })
    }

    renderPage(){
        if(this.state.articleData !== false && this.state.featuredBrand !== false){
            const {articleData, featuredBrand} = this.state;
            return(
                <div className="home">
                    <Link to={`/editorial/${articleData.id}/${articleData.title}`}>
                        <div className="article imgHolder" style={{backgroundImage: 'url(' + articleData.screen_image + ')'}} >
                            <div className="overlay"></div>
                            <h2 className="ui header article-title">{articleData.title}</h2>
                            <h3 className="ui header article-subtitle">{articleData.subtitle}</h3>
                        </div>
                    </Link>
                    <Link to={`/designers/${featuredBrand.name}/${featuredBrand.id}`}>
                        <div className="featured-brand imgHolder" style={{backgroundImage: 'url(' + featuredBrand.image + ')'}}>
                        <div className="overlay"></div>
                            <h2 className="ui header brand-title">{featuredBrand.name}</h2>
                        </div>
                    </Link>
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
        return(
            <section id="home">
                <main role="main">
                    {this.renderPage()}
                </main>
            </section>
        )
    }
}

export default Home;