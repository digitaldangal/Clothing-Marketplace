require('isomorphic-fetch');
require('dotenv').config();

const api_key = process.env.SENDGRID_API_KEY;

function contactEmail (req, res, next) {
    // fetch('/contact-submit').then((res)=>{
    //     console.log(res)
    // })
    // .catch(err=>(console.log(err)))
    console.log(req.body.first_name)
}

module.exports = {contactEmail};