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
      subject: `Request: ${req.body.request} - ${req.body.subject}`,
      text: `New message from a user on Streetwear Boutiques`,
      html: `username: ${req.body.display_name} \n uid: ${req.body.uid}<br/>From ${req.body.first_name} ${req.body.last_name}<br/> ${req.body.message}`,
    };
    sgMail.send(msg,false,function (error, message) {
      if (error) {
         (console.log(error));
      } else {
          console.log("Email messageponse");
          console.log(message)
          return res.send(message)
      }
    }).then((message)=>{
        return message;
      }).catch(err=>{
        return err;
      });
}

module.exports = {contactEmail};