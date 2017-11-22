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
            featuredBrand: false
        }
    }

    componentWillMount() {
        let articleRef = db.collection("articles").doc("article_0");
        let articleData = {};

        articleRef.get().then((res)=>{
            console.log(res.data());
            return articleData = res.data();
        }).then(()=>{
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
                    <Link to={`/designers/${brand.name}/${brand.id}`}>
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