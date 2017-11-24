import React, { Component } from 'react';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    handleContactSubmit = (e) => {
        e.preventDefault();


    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <section className="contact">
                <div className="contact-form ui container">
                    <h1 className="ui header">Contact US</h1>
                    <p className="text">Hey there! If you have any questions, comments, or concerns, please let us know and fill out the form below. We will get back to you as soon as possible.</p>
                    <div className="page-container">
                        <div className="contact-form">
                            <form onSubmit={this.handleContactSubmit} className="ui form">
                                <div id="form-error"></div>
                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" name="first_name" type="text" placeholder="First Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" name="last_name" type="text" placeholder="Last Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input name="display_name" type="text" placeholder="Display Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" name="email" type="text" placeholder="Email" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input name="subject" type="text" placeholder="Subject" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <select required="true" name="request" type="text" onChange={(e)=>this.handleChange(e)}>
                                                <option defaultValue value="general">General Question</option>
                                                <option value="order_info">Order Information</option>
                                                <option value="seller_question">Seller Question</option>
                                                <option value="purchasing">Purchasing or Paypal Issue</option>
                                                <option value="bug">Report A Bug</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label>Message</label>
                                    <textarea required="true" name="message" rows="10" placeholder="Message" onChange={(e)=>this.handleChange(e)}></textarea>        
                                </div>

                                <button className="ui secondary button" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Contact;