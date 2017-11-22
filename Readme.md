#  StreetwearBoutiques.com 1.4.0-alpha (in progress)

This application will serve as way to connect emerging streetwear brands directly to the customers. 

Test Account:
email: test@gmail.com
password: abc123

![Copped WireFrame Screenshots](./assets/home-page.png?raw=true "Copped WireFrames")

### Project Stricture / Features
These are some of the features that I plan on tackling as I build this project
- [X] Registered Domain Name --> streetwearboutiques.com
- [x] Registration
    - [X] Oauth
    - [X] Email Confirmation
    - [x] Brand Signup or Consumer Signup
- [ ] Integrating Redux
- [X] Integrating Firebase
    - [X] Authentication
    - [X] Storage
    - [X] Hosting 
    - [X] Database
- [x] Brands
    - [X] List of Designers/Brands 
    - [x] Register a Brand 
    - [X] Store Brands on Firebase 
- [X] Products
    - [x] Create a new product
    - [x] Store Products on Firebase
    - [x] Retrieve and view products
- [ ] Purchasing
    - [ ] Cart
    - [ ] Wishlist
    - [ ] Delivery Logistics
- [x] Home Section
    - [x] Articles View
    - [x] Featured Brands or Random Brands
- [ ] Articles
- [ ] About
- [ ] Contact


Future Improvements
- [ ] Searching
- [ ] 10-20 Starting Brands, go up by 5-10 every month
- [ ] Weekly Articles
- [ ] Improve with drag and drop to reorder images
- [ ] Create Admin Dashboard
    - [ ] View All Users
    - [ ] View All Brands
    - [ ] Approve Brands
    - [ ] Upload and change articles
    - [ ] Change featured brands

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

## The Making of Streerwear Boutiques

### Screenshots

#### Register as a brand
![Register As a Brand](./assets/brandCreate.png?raw=true "Brand Create")

#### Upload A Clothing Item
![Upload A Clothing Item](./assets/upload-page.png?raw=true "Product Create")

#### Login Page
![Login page](./assets/login-page.png?raw=true "Login page")

#### Product Page
![Product Page](./assets/product-page.png?raw=true "Product page")

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