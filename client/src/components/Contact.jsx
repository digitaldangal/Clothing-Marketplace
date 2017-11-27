import React, { Component } from 'react';
import axios from 'axios';
import{Redirect} from 'react-router-dom';
import firebase from '../config/firebase';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            request: 'general',
            redirect: false,
            currentPage: '',
            uid: false
        }
    }
    componentWillMount(){
        let uid = '';
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                uid = user.uid;
                this.setState({uid: uid})
            }else{
                null;
            }
        })
    }
    handleContactSubmit = (e) => {
        e.preventDefault();
        axios.post('/contact-submit', {
            display_name: this.state.display_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            message: this.state.message,
            request: this.state.request,
            subject: this.state.subject,
            email: this.state.email,
            uid: (this.state.uid ? this.state.uid : 'none')
        }).then(res=>{
            this.redirectPage();
        }).catch(err=>{
            console.log(err);
            this.redirectPage();
        })

        this.setState({
            display_name: "",
            first_name: "",
            last_name: "",
            message: "",
            request: "",
            subject: "",
            email: "",
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    redirectPage(){
        this.setState({
            redirect: true,
            currentPage: '/'
        })
    }

    render(){
        const {redirect, currentPage} = this.state;
        return(
            <section className="contact">
            {redirect ? <Redirect to={currentPage} /> : null}
                <div className="contact-form ui container">
                    <h1 className="ui header">Contact US</h1>
                    <p className="text">Hey there! If you have any questions, comments, or concerns, please let us know and fill out the form below. We will get back to you as soon as possible.</p>
                    <div className="page-container">
                        <div className="contact-form">
                            <form onSubmit={this.handleContactSubmit} className="ui form" id="contact-form">
                                <div id="form-error"></div>
                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" value={this.state.first_name} name="first_name" type="text" placeholder="First Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" value={this.state.last_name} name="last_name" type="text" placeholder="Last Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input name="display_name" value={this.state.display_name} type="text" placeholder="Display Name" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input required="true" value={this.state.email} name="email" type="text" placeholder="Email" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui input focus">
                                            <input name="subject" required="true" value={this.state.subject} type="text" placeholder="Subject" onChange={(e)=>this.handleChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui input focus">
                                            <select required="true" value={this.state.request} name="request" type="text" onChange={(e)=>this.handleChange(e)}>
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
                                    <textarea required="true" value={this.state.message} name="message" rows="10" placeholder="Message" onChange={(e)=>this.handleChange(e)}></textarea>        
                                </div>

                                <button className="ui secondary button" type="submit" onSubmit={this.handleContactSubmit}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Contact;