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
                tempArticleData[article.data().title] = article.data()
                this.setState({articleData: tempArticleData})
            })
        }).catch(err=>console.log(err))
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    rendePage(){
        // if(){

        // }else{
        //     return(
        //         <div className="ui active inverted dimmer">
        //             <div className="ui indeterminate text loader">Preparing Files</div>
        //         </div>
        //     )
        // }
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