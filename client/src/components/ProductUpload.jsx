import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

// Initialize Cloud Firestore through firebase
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();

class ProductUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBlobs: {}
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).get()
                .then(res=>{
                    this.setState({currentUser: res.data()})
                }).catch(err=>console.log(err))

                this.setState({
                    uid: user.uid,
                    redirect: false,
                    currentPage: ''
                })

                let brandRef = db.collection("brands").doc(this.state.uid);
                brandRef.get().then((res)=>{
                    if(res.exists && res.data().approved){
                        this.setState({
                            brandStatus: true,
                            brandCreated: true
                        })
                    }else if(res.exists){
                        this.setState({
                            brandCreated: true
                        })
                    }
                })
            }else{
                this.setState({
                    redirect: true,
                    currentPage: '/account/login'
                }) 
            }
        })
    }

    renderPicPreviews = (e) =>{
        let fileList = e.target.files;
        let picPreview = document.querySelector('#pic-preview ul');
        for(var i = 0; i <fileList.length; i++){
            var file = fileList[i];
            var fileURL = URL.createObjectURL(file);
            var tempListTag = document.createElement('li');
            var tempPic = document.createElement('img');
            var removeIcon = document.createElement('i');

            tempPic.src = fileURL;
            tempPic.dataset.name = file.name;
            tempPic.id = i;
            tempPic.className = 'temp-pic';
            
            tempListTag.appendChild(removeIcon)
            picPreview.appendChild(tempListTag).appendChild(tempPic)
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        var uploadedFiles = document.querySelector('#products_upload').files;
        let imageRef = storageRef.child(`${this.state.uid}/${this.state.title}`);
        let downloadUrl = '';
        
        db.collection("brands").doc(this.state.uid).collection("products").doc(this.state.title).set({
            title: this.state.title,
            designer: this.state.designer,
            price: this.state.price,
            size: this.state.title,
            category: this.state.category,
            description: this.state.description
        },{ merge: true })
        .then(res=>{console.log(res);
        }).catch(err=>console.log(err))

        for(let i = 0; i < uploadedFiles.length; i++){
            let currentFile = uploadedFiles[i];
            
            imageRef.child(currentFile.name).put(currentFile).then((res)=>{
                console.log(res)
                downloadUrl = res.downloadURL;
                db.collection("brands").doc(this.state.uid).collection("products").doc(this.state.title).set({
                    [currentFile.name]: downloadUrl
                },{ merge: true }).then(res=>console.log(res))
                .catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }

        console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")

    }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <div>
                {redirect ? <Redirect to={currentPage} /> : null}
                <h1>Product Upload Page</h1>
                <form onSubmit={this.handleSubmit} className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Product Title
                                </div>
                                <input required="true" name="title" type="text" placeholder="Product Title" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Brand Name
                                </div>
                                <input required="true" name="designer" type="text" placeholder="Designer/Brand Name" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                    </div>

                    <div className="three fields">
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    USD Price
                                </div>
                                <input required="true" name="price" type="number" placeholder="USD Price" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Size
                                </div>
                                <select required="true" name="size" type="text" onChange={(e)=>this.handleChange(e)}>
                                    <option disabled selected value> -- select -- </option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Category
                                </div>
                                <select required="true" name="category" type="text" onChange={(e)=>this.handleChange(e)}>
                                    <option disabled selected value> -- select -- </option>
                                    <option value="OUTERWEAR">OUTERWEAR</option>
                                    <option value="TOPS">TOPS</option>
                                    <option value="BOTTOMS">BOTTOMS</option>
                                    <option value="FOOTWEAR">FOOTWEAR</option>
                                    <option value="ACCESSORIES">ACCESSORIES</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label>Product Description</label>
                        <textarea required="true" name="description" rows="2" placeholder="Product Description" onChange={(e)=>this.handleChange(e)}></textarea>
                    </div>

                    <div className="field">
                        <label>Upload At Least One Image for this Product </label>
                        <input type="file" name="photos" id="products_upload" multiple required onChange={(e)=>this.renderPicPreviews(e)} />
                        <div id="pic-preview">
                            <ul>
                                
                            </ul>
                        </div>
                    </div>
                    <button className="ui primary button" type="submit">Create Product</button>
                </form>
            </div>
        )
    }
}

export default ProductUpload;

/* 

{
"data":{
"id":3218863,
"title":"Maison Margiela Printed T-shirt Size: S %100 Authentic",
"created_at":"2017-09-13T18:12:25.396Z",
"price":28,
"fee":"3.21",
"description":"I AM SELLING CHEAP! %100 AUTHENTIC\nPit to pit: 46 centimeter ( 1,50 feet)\nMaison Margiela Printed Short Sleeve T-shirt Size: Small\nCotton 100%\nNew without Tags!\n%100 Authentic\nDo not include washing label!",
"size":"s",
"category":"tops",
"subcategory":"Short Sleeve T-Shirts",
"photos":[
    {
        "id":22524849,
        "url":"https://cdn.fs.grailed.com/api/file/AUPtF13YQXi6ZWMsIvzK",
        "width":495,
        "height":880,
        "image_api":"filepicker",
        "rotate":0
    },
    {
        "id":22524850,
        "url":"https://cdn.fs.grailed.com/api/file/tfeHBYnRZaMV5k1D2bMQ",
        "width":1100,
        "height":1956,
        "image_api":"filepicker",
        "rotate":0
    },
    {
        "id":22524851,
        "url":"https://cdn.fs.grailed.com/api/file/HxiCQrKBSwSPJmL5esFN",
        "width":1100,
        "height":1956,
        "image_api":"filepicker",
        "rotate":0
    }
],
"designer":{
    "id":2308,
    "name":"Maison Margiela",
    "slug":"maison-margiela"
},
"seller":{
    "id":824674,
    "username":"regnarlodbrok",
    "avatar_url":null,
    "height":null,
    "weight":null,
    "location":"Europe",
    "location_abbreviation":"eu",
    "aggregate_feedback_count":1,
    "buyer_score":{
        "purchase_count":0,
        "would_sell_to_again_count":0
    },
    "seller_score":{
        "sold_count":1,
        "would_buy_from_again_count":1,
        "item_as_described_average":5,
        "fast_shipping_average":5,
        "communication_average":5,
        "seller_feedback_count":1
    },
    "listings_for_sale_count":3,
}

*/