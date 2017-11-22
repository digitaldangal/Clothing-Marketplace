import React, { Component } from 'react';
import Article from './Article';
import FeaturedBrands from './FeaturedBrands';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        let articleRef = db.collection("articles").doc("article_0");

        articleRef.get()
    }

    render(){
        return(
            <section>
                <main role="main">
                    <Article />
                    <div>
                        <h1>Featured Brands</h1>
                        <FeaturedBrands />
                    </div>
                </main>
            </section>
        )
    }
}

export default Home;