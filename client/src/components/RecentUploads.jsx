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
        db.collection("products").where("deleted", "==", false).orderBy("created_date",'desc').limit(20).onSnapshot((res)=>{
            res.forEach((upload)=>{
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
        const cardLayout = {
            "display": "flex",
            "flexFlow": "row wrap",
            "justifyContent": "center",
            "marginTop": "1em"
        }
        const singleCard = {
            "margin": "0em 1.5em 1em",
            "width": "auto"
        }
        return(
            <div className="ui link cards recent-upload-container" style={cardLayout}>
                {Object.values(productData).map((product, i)=>{
                    const style = {
                        "backgroundImage": `url(${product.main_image}`,
                        "backgroundSize": "cover",
                        "width": "250px",
                        "height": "250px",
                        "backgroundPosition": "center",
                        "backgroundRepeat": "no-repeat"
                    }
                    return(
                        <div className="card" key={i} style={singleCard}>
                            <Link to={`/designers/${product.designer}/${product.clothing_label.id}/${product.title}/${product.id}`}>
                                <div className="imageHolder" style={style}></div>
                            </Link>    
                                <div className="content">
                                    <div className="header">
                                        <Link to={`/designers/${product.designer}/${product.clothing_label.id}/${product.title}/${product.id}`}>
                                            {product.title}
                                        </Link>
                                    </div>
                                    {product.inventory_total === 0 ? (<p id="soldout">SOLD OUT</p>) : null}
                                    <div className="description links">
                                        <Link to={`/designers/${product.designer}/${product.clothing_label.id}`}>{product.designer}</Link>
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
                <h2 className="ui header" style={{marginTop: "1em"}}>New Arrivals</h2>
                {this.state.productDataLoaded ? this.renderPage() : null}
            </div>
        )
    }
}

export default RecentUploads;