import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class ReadArticle extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        let articleId = Number(this.props.match.params.id);
        let articleRef = db.collection('articles').doc(`article_${articleId}`);
        let articleInfo = {};

        articleRef.get().then((res)=>{
            console.log(res.data());
        }).catch(err=>console.log(err))

    }

    componentWillUpdate(prevProps, prevState) {
        console.log(prevProps, prevState)
    }
    // rendePage(){
    //     if(){

    //     }else{
    //         return(
    //             <div className="ui active inverted dimmer">
    //                 <div className="ui indeterminate text loader">Preparing Files</div>
    //             </div>
    //         )
    //     }
    // }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <div>
                {redirect ? <Redirect to={currentPage} /> : null}
                {/* {this.rendePage()} */}
            </div>
        )
    }
}

export default ReadArticle;