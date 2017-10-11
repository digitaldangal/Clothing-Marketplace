import React, { Component } from 'react';
import BrandService from '../services/BrandService'

class BrandForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
    }

    handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                <h1 className="page-title">Create a Brand</h1>
                <h3>Brands must first be approved before you are allowed to post</h3>
                <form onSubmit={this.handleSubmit} className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Brand Name
                                </div>
                                <input required="true" name="name" type="text" placeholder="Brand Name" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui labeled input">
                                <div className="ui label">
                                    Inventory
                                </div>
                                <input required="true" name="inventory_size" type="number" placeholder="Inventory Count" onChange={(e)=>this.handleChange(e)}/>
                            </div>
                        </div>
                    </div>

                    <div className="three field">
                        <div className="field">
                            <label>Brand Description</label>
                            <textarea required="true" name="description" rows="2" placeholder="Brand Description" onChange={(e)=>this.handleChange(e)}></textarea>        
                        </div>
                        <div className="field">
                            <label>Shipping Address</label>
                            <textarea name="shipping_address" rows="2" placeholder="Where will you ship from?" onChange={(e)=>this.handleChange(e)}></textarea>
                        </div>
                        <div className="field">
                            <label>Social Media Links</label>
                            <textarea name="links" rows="2" placeholder="Separate All Social Media links with a comma" onChange={(e)=>this.handleChange(e)}></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="ui labeled input">
                            <div className="ui label">
                                Website Url
                            </div>
                            <input name="website" type="text" placeholder="https://example.com" onChange={(e)=>this.handleChange(e)}/>
                        </div>
                    </div>
                    <button className="ui primary button" type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default BrandForm;