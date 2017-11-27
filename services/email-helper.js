require('isomorphic-fetch');
require('dotenv').config();

let email = process.env.SENDGRID_EMAIL;
let SENDGRID_KEY = process.env.SENDGRID_KEY

function contactEmail (req, res, next) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SENDGRID_KEY);
    const msg = {
      to: email,
      from: req.body.email,
      subject: `Request: ${req.body.subject} From ${req.body.first_name} ${req.body.last_name}`,
      text: `New message from a user on Streetwear Boutiques`,
      html: `username: ${req.body.display_name} \n uid: ${req.body.uid} \n ${req.body.message}`,
    };
    sgMail.send(msg).then((res)=>console.log(res)).catch(err=>console.log(err));
}

module.exports = {contactEmail};