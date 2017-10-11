import React, { Component } from 'react';
import firebase from '../config/firebase';
import BrandService from '../services/BrandService'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            brand: undefined
        }
        this.rootRef = firebase.database().ref();
        this.userProfileRef = this.rootRef.child('Users')
        this.addBrandService = new BrandService();
    }
    
    handleSubmit=(e)=>{
        e.preventDefault(); 
        // this.userProfileRef.child(this.props.userInfo.uid).child('brand').child('name').set("Rick Owens")
        // this.userProfileRef.child(this.props.userInfo.uid).child('about').child('content').set(firebase.auth().currentUser.toJSON())
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
        this.addBrandService.sendData(this.state.brand)
    }

    handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleLogOut=()=>{
        if(window.confirm("Do you want to log out?")){
            firebase.auth().signOut()
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            this.props.authStateChange("signed out")
        }else{
            console.log("logged out cancel")
            return null
        }
    }
    render(){
        return(
            <div className="profile-page">
                <h1 className="page-title">Profile Page</h1>
                <div className="edit-form">
                <h1 className="page-title">Create a Brand</h1>
                <h3>Brands must first be approved before you are allowed to post</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Brand Name
                            </div>
                            <input required="true" name="name" type="text" placeholder="Brand Name" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Description
                            </div>
                            <input required="true" name="description" type="text" placeholder="Brand Description" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Shipping Address
                            </div>
                            <input required="true" name="shipping_address" type="text" placeholder="Where you will ship from" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Inventory
                            </div>
                            <input required="true" name="inventory_size" type="number" placeholder="Number of different products you will sell" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Social Media Links
                            </div>
                            <input required="true" name="links" type="text" placeholder="Separate All Social Media links with a comma" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="ui labeled input">
                            <div className="ui label">
                                Website Url
                            </div>
                            <input name="website" type="text" placeholder="https://example.com" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <button className="ui primary button" type="submit">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Profile;