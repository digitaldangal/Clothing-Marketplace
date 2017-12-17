import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import firebase from '../config/firebase';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            articleData: false,
            featuredBrand: false,
            brandImage: false,
        }
    }
    
    componentDidMount() {
          let articleRef = "https://firestore.googleapis.com/v1beta1/projects/copped-9a558/databases/(default)/documents/articles/article_0/";
          let featBrandRef = "https://firestore.googleapis.com/v1beta1/projects/copped-9a558/databases/(default)/documents/articles/article_0/brand/brand_1";
          let articleData = {};
          let brandData = {};
          
          if(this.props.articleDataLoaded === false){
            axios.get(articleRef)
            .then((res) => {
                console.log(res.data.fields)
                articleData = res.data.fields;
                this.setState({
                    articleData: articleData
                })
                return res.data.fields;
            }).then(()=>{
                axios.get(featBrandRef).then((res)=>{
                    console.log(res.data.fields)
                    brandData = res.data.fields;
                    this.setState({
                        featuredBrand: brandData,
                        dataLoaded: true
                    })
                }).catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }else{
            let articleDataInfo = this.props.articleData;
            let featBrandDataInfo = this.props.featBrandData;
            let featImage = this.props.image;

            this.setState({
                featuredBrand: featBrandDataInfo,
                brandImage: featImage,
                articleData: articleDataInfo
            })
        }
    }

    shouldComponentUpdate(prev, next){
        if(prev.articleDataLoaded && next.dataLoaded){
            return true;
        }else{
            return true;
        }
    }

    renderPage=()=>{
        const {articleData, featuredBrand} = this.state;
        return(
            <div className="home">
                <Link to={`/editorial/${articleData.id.integerValue}/${articleData.title.stringValue}`}>
                    <div className="article imgHolder" style={{backgroundImage: 'url(' + articleData.screen_image.stringValue + ')'}} >
                        <div className="overlay"></div>
                        <h2 className="ui header article-title">{articleData.title.stringValue}</h2>
                        <h3 className="ui header article-subtitle">{articleData.subtitle.stringValue}</h3>
                    </div>
                </Link>
                <Link to={`/designers/${featuredBrand.name.stringValue}/${featuredBrand.id.integerValue}`}>
                    <div className="featured-brand imgHolder" style={{backgroundImage: 'url(' + featuredBrand.image.stringValue + ')'}}>
                    <div className="overlay"></div>
                        <h2 className="ui header brand-title">Featured Brand: <br/>{featuredBrand.name.stringValue}</h2>
                    </div>
                </Link>
            </div>
        )
    }

    spinner(){
        return(
            <div className="ui active inverted dimmer">
                <div className="ui indeterminate text loader">Preparing Files</div>
            </div>
        )
    }

    render(){
        return(
            <section id="home">
                <main role="main">
                   {this.state.featuredBrand !== false ? this.renderPage() : this.spinner()}
                </main>
            </section>
        )
    }
}

export default Home;