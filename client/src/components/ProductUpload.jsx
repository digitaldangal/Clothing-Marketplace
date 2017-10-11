import React, { Component } from 'react';

class ProductUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileList: null,
        }
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

            tempPic.src = fileURL, tempPic.dataset.name = file.name, tempPic.id = i, tempPic.className = 'temp-pic';
            // removeIcon.className = "remove icon", removeIcon.id = i, removeIcon.addEventListener('click', this.deleteImage);

            tempListTag.appendChild(removeIcon)
            picPreview.appendChild(tempListTag).appendChild(tempPic)
        }
    }

    /* deleteImage = (e) => {
        var imgToRemove = document.querySelector(`img[id="${e.target.id}"]`)
        let fileList = document.querySelector('input[type="file"]').files;
        console.log(fileList)
        e.target.remove();
        imgToRemove.remove();
        fileList.item
        console.log('Image Deleted');
    } */

    render(){
        return(
            <div>
                <h1>Product Upload Page</h1>
                <form action="">
                    <input type="file" name="pictures" id="products_upload" multiple onChange={(e)=>this.renderPicPreviews(e)} />
                    <div id="pic-preview">
                        <ul>
                            
                        </ul>
                    </div>
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