import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleData: false,
            featuredArticle: false
        }
    }

    componentWillMount() {
        let articleFeed = db.collection("articles").orderBy("created");
        let tempArticleData = {}
        let featuredArticleData = {}

        articleFeed.limit(15).get().then((res)=>{
            res.forEach((article)=>{
                return tempArticleData[article.data().title] = article.data()
            })
            this.setState({articleData: tempArticleData})
        }).then(()=>{
            db.collection("articles").doc("article_0").get().then((res)=>{
                return featuredArticleData = res.data();
            })
            this.setState({featuredArticle: featuredArticleData})
        })
        .catch(err=>console.log(err))
    }

    rendePage(){
        if(this.state.articleData !== false){
            const {articleData} = this.state;
            return(
                <div className="article-list">
                    <h1 className="ui header title">Latest Articles</h1>
                    <div className="page-container article-list ui container">
                        <div className="featured-article">
                        
                        </div>
                        {Object.values(articleData).map((article, i)=>{
                            return(
                                <div className="article" key={i}>
                                    <div className="image">
                                        <img src={article[Object.keys(article)[5]]} alt=""/>
                                    </div>
                                    <h2 className="ui header article-title">{article.title}</h2>
                                    <h3 className="ui header article-subtitle">{article.subtitle}</h3>
                                </div>
                            )
                        })}
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
            <section className="article-feed">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.rendePage()}
            </section>
        )
    }
}

export default Article;