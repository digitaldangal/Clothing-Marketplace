import React, { Component } from 'react';
import axios from 'axios';
import{Redirect} from 'react-router-dom';
import firebase from '../config/firebase';
var db = firebase.firestore();

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            request: 'general',
            redirect: false,
            currentPage: ''
        }
    }

    handleContactSubmit = (e) => {
        e.preventDefault();
        let uid = '';
        firebase.auth().onAuthStateChanged((user)=>{
            user ? uid = user.uid : '';
            return uid;
        })
        axios.post('/contact-submit', {
            display_name: this.state.display_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            message: this.state.message,
            request: this.state.request,
            subject: this.state.subject,
            email: this.state.email,
            uid: uid
        },{ mode: 'no-cors'}).then((res)=>{
            console.log(res)
        }).catch(err=>(console.log(err)))
        

        // fetch("https://formspree.io/kamidou95@gmail.com", {
        //     method: 'POST',
        //     body: new FormData(document.getElementById('contact-form')),
        // }).then((res)=>{
        //     console.log(res);
        //     db.collection("contact").doc(this.state.request).collection(`${new Date().getMonth()} ${new Date().getDay()}`).doc(`${new Date().getTime()}`).set({
        //         display_name: this.state.display_name,
        //         first_name: this.state.first_name,
        //         last_name: this.state.last_name,
        //         message: this.state.message,
        //         request: this.state.request,
        //         subject: this.state.subject
        //     }).catch(err=>{console.log(err)})
        // })
        // .then(()=>{
        //     this.redirectPage();
        // })
        // .catch(err=>console.log(err))

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