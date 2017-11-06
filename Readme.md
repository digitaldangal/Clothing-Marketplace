#  StreetwearBoutiques.com(in progress)

This application will serve as way to connect emerging streetwear brands directly to the customers. 
Web App that could be utilize as an online wardrobe / closet to help create a visual representation of a person's clothing collection
<!-- ![armoire image](./public/splashimage.png) -->

### Project Stricture / Features
These are some of the features that I plan on tackling as I build this project
- [ ] Registered Domain Name --> streetwearboutiques.com
- [ ] Breaking Down Wire-frames into React components (using styled components)
- [ ] Create a REST API using Node
- [ ] Registration
    - [X] Oauth
    - [ ] Email Confirmation
    - [ ] Brand Signup or Consumer Signup
- [ ] Integrating Redux
- [ ] Integrating MongoDB with Firebase
- [ ] Searching
- [ ] Brands
    - [ ] List of Designers/Brands 
    - [x] Register a Brand 
    - [ ] Store Brands on Firebase 
    - [ ] 10-20 Starting Brands, go up by 5-10 every month
- [ ] Products
    - [x] Create a new product
    - [ ] Store Products on Firebase
    - [ ] Improve with drag and drop to reorder images
- [ ] Purchasing
    - [ ] Delivery Logistics

## Installation 
1. Run npm install in the client folder.
2. in the same client folder run npm start
3. Inside client/semantic run gulp build to install the Semantic UI files
4. Navigate to client/src/config/
5. In this folder you should see firebaseui.js, you will also need a firebase.js file.
6. Register an application with anyname on firebase and copy the code necessary to connect your web app to firebase and paste it in firebase.js
    ```javascript
        import * as firebase from 'firebase';
        // Initialize Firebase
        var config = {
            apiKey: "insert-here",
            authDomain: "insert-here",
            databaseURL: "insert-here",
            projectId: "insert-here",
            storageBucket: "insert-here",
            messagingSenderId: "insert-here"
            };
            
        firebase.initializeApp(config);
        export default firebase;
    ```
7. In the root folder of the project run npm install to install back end dependencies

## The Making of Copped.com

### Wireframes

#### Inital HomePage Wireframe
![Copped Wirefreame Screenshots](./assets/wireframe1.png?raw=true "Copped Wirefreames")

#### Brands Listing
![Copped Wirefreame Screenshots](./assets/wireframe2.png?raw=true "Copped Wirefreames")

#### Individual Brand
![Copped Wirefreame Screenshots](./assets/wireframe3.png?raw=true "Copped Wirefreames")

### Screenshots

#### Register as a brand
![Register As a Brand](./assets/brandCreate.png?raw=true "Brand Create")

#### Upload A Clothing Item
![Upload A Clothing Item](./assets/productCreate.png?raw=true "Product Create")

### Technical Discussion
Tech Stack
* HTML / CSS (SASS)
* JavaScript
* Semantic UI
* Payment(Shopify, Stripe, or Paypal)
* React with Redux possibly
* Node.js /Express.js
* Redis
* Google Firebase(Authentication, Storage, Hosting, & Database Services)
* MongoDB

## Code Snippet

The code snippet is what renders a preview gallery of images a user has chosen to upload when posting a new article of clohting. 

```javascript
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
        tempListTag.appendChild(removeIcon)
        picPreview.appendChild(tempListTag).appendChild(tempPic)
    }
}

<div className="field">
    <label>Upload At Least One Image for this Product </label>
    <input type="file" name="photos" id="products_upload" multiple required onChange={(e)=>this.renderPicPreviews(e)} />
    <div id="pic-preview">
        <ul>
            <!-- Gallery Gets Render Here  -->
        </ul>
    </div>
</div>
```

## Opportunities for Future Growth 