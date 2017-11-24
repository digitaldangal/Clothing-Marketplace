import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleData: false,
            featuredBrand: false,
            brandImage: false,
        }
    }

    componentWillMount() {
        let articleRef = db.collection("articles").doc("article_0");
        let featBrandRef = articleRef.collection("brand").doc("brand_1");
        let articleData = {};
        let brandData = {};

        if(this.props.articleDataLoaded === false){
            articleRef.get().then((res)=>{
                return articleData = res.data();
            }).then(()=>{
                featBrandRef.get().then((res)=>{
                    this.setState({brandImage: res.data().image})
                    this.props.storeBrandImage(res.data().image)
                    return res;
                }).then((res)=>{
                    db.collection("brands").where("id", "==", res.data().id).get().then((res)=>{
                        res.forEach((brand)=>{
                            return brandData = brand.data();
                        })
                        this.setState({featuredBrand: brandData})
                        this.props.storeArticleData(articleData, brandData);
                    }).catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
                this.setState({articleData: articleData})
            })
        }else{
            let articleDataInfo = this.props.articleData;
            let featBrandDataInfo = this.props.featBrandData;
            let featImage = this.props.image;

            this.setState({
                featuredBrand: featBrandDataInfo,
                brandImage: featImage,
                articleData: articleDataInfo,
            })
        }
    }

    shouldComponentUpdate(prev, next){
        if(next.articleData && next.featuredBrand){
            return true;
        }else{
            return false;
        }
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
                        <div className="featured-brand imgHolder" style={{backgroundImage: 'url(' + this.state.brandImage + ')'}}>
                        <div className="overlay"></div>
                            <h2 className="ui header brand-title">Featured Brand: <br/>{featuredBrand.name}</h2>
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