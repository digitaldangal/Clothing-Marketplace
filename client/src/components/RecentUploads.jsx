import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class RecentUploads extends Component {
    constructor(props){
        super(props);
        this.state = {
            productData: false,
            productDataLoaded: false,
        }
    }

    componentDidMount() {
        let recentUploads = {}
        db.collection("products").where("deleted", "==", false).orderBy("created_date",'desc').limit(10).onSnapshot((res)=>{
            res.forEach((upload)=>{
                console.log(upload.data());
                return recentUploads[upload.data().title] = upload.data();
            })
            this.setState({
                productData: recentUploads,
                productDataLoaded: true
            })
        })
    }

    renderPage=()=>{
        const {productData} = this.state;
        return(
            <div className="product-container">
                {Object.values(productData).map((product, i)=>{
                    return(
                        <div className="card" key={i}>
                            <Link to={`/designers/${product.designer}/${product.clothing_label.id}/${product.title}/${product.id}`}>
                                <div className="image">
                                    <img src={product.main_image} alt=""/>
                                </div>
                            </Link>    
                                <div className="content">
                                    <div className="header">{product.title}</div>
                                        {product.inventory_total === 0 ? (<p id="soldout">SOLD OUT</p>) : null}
                                    <div className="description links">
                                        {product.title}
                                    </div>
                                    <div className="meta links">
                                        <Link to={`/search/products/${product.category.toLowerCase()}`}>{product.category}</Link>
                                        <a>${product.price}</a>
                                    </div>
                                </div>
                        </div> 
                    )
                })}
            </div>
        )
    }

    render(){
        return(
            <div id="recent-uploads">
                <h2 className="ui header">Recently Uploaded</h2>
                {this.state.productDataLoaded ? this.renderPage() : null}
            </div>
        )
    }
}

export default RecentUploads;