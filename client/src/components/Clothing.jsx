import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();

class Clothing extends Component {
    constructor(props){
        super(props);
        this.state = {
            clothingData: false,
            brandData: false,
            loadPage: false,
        }
    }

    componentWillMount() {
        let brandID = Number(this.props.match.params.brand_id);
        let productTitle = this.props.match.params.product_title;
        let productID = Number(this.props.match.params.id);
        let brandRef = db.collection('brands').where('id', "==", brandID);
        let brandData = {};
        let productData = {};
        let brandUID = undefined;

        brandRef.get().then((res)=>{
            console.log(res)
            if(res.empty){
                this.setState({
                    clothingData: false,
                    dontLoad: true,
                    clothingDataLoaded: false
                })
            }else{
                res.forEach((res)=>{
                    console.log(res.data())
                    brandUID = res.id;
                    return brandData = res.data();
                })
                db.collection('brands').doc(brandUID).collection('products').where("id", "==", productID).where("title", "==", productTitle).get()
                .then((res)=>{
                    if(res.empty){
                        this.setState({
                            clothingData: false,
                            clothingDataLoaded: false
                        })
                    }else{
                        res.forEach((product)=>{
                            console.log(product.data())
                            return productData = product.data();
                        })
                        this.setState({clothingData: productData, clothingDataLoaded: true, loadPage: true})
                    }
                }).catch(err=>(console.log(err)))
                this.setState({brandData: brandData})
            }
        }).catch(err=>{console.log(err)})
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    renderPage(){
        if(this.state.clothingData !== false && this.state.clothingDataLoaded !== false){
            return(
                <h1>Clothes</h1>
            )
        }
        else if(this.state.clothingDataLoaded === undefined && this.state.loadPage === false){
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui indeterminate text loader">Preparing Files</div>
                </div>
            )
        }else if(this.state.dontLoad === true && this.state.clothingDataLoaded === false){
            return(
                <div className="single-brand">
                    <h1 className="ui header title"> 404 - Page not found</h1>
                    <Link to='/designers'><Button secondary>Check Out Some Designers</Button></Link>
                    <div className="page-container">
                        <img src="" alt=""/>
                    </div>
                </div>
            )
        }
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section id="single-clothing">
                {redirect ? <Redirect to={currentPage} /> : null}
                {this.renderPage()}
            </section>
        )
    }
}

export default Clothing;