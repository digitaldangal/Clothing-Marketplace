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
        }
    }

    componentWillMount() {
        let articleFeed = db.collection("articles").orderBy("created");
        let tempArticleData = {}

        articleFeed.limit(15).get().then((res)=>{
            res.forEach((article)=>{
                console.log(article.data())
                return tempArticleData[article.data().title] = article.data()
            })
            this.setState({articleData: tempArticleData})
        }).catch(err=>console.log(err))
    }

    rendePage(){
        if(this.state.articleData !== false){
            const {articleData} = this.state;
            return(
                <div className="article-list">
                    <h1 className="ui header">Latest Articles</h1>
                    <div className="page-container">
                        {Object.values(articleData).map((article, i)=>{
                            return(
                                <div className="article" key={i}>
                                    <img src={article[Object.keys(article)[4]]} alt=""/>
                                    <h2 className="ui header article-title">{articleData.title}</h2>
                                    <h3 className="ui header article-subtitle">{articleData.subtitle}</h3>
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
            <div>
                {redirect ? <Redirect to={currentPage} /> : null}
                <section className="article-feed">
                    {this.rendePage()}
                </section>
            </div>
        )
    }
}

export default Article;