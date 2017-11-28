require('isomorphic-fetch');
require('dotenv').config();
var paypal = require('paypal-rest-sdk');

let PaypalAccessToken = process.env.PaypalAccessToken;
let PayPalClient_id = process.env.PayPalClient_id;
let PayPalClient_Secret = process.env.PayPalClient_Secret;
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': PayPalClient_id,
    'client_secret': PayPalClient_Secret
  });

function pay (req, res, next) {
    var payReq = JSON.stringify({
        intent: 'authorize',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: 'http://localhost:3000/process',
          cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
          amount: {
            total: req.body.total,
            currency: 'USD'
          },
          description: 'This is the payment transaction description.',
        }]
    });
    
    paypal.payment.create(payReq, function (error, payment) {
        var links = {};
      
        if (error){
          console.error(JSON.stringify(error));
        } else {
          // Capture HATEOAS links.
          payment.links.forEach(function (linkObj) {
              links[linkObj.rel] = {
                  href: linkObj.href,
                  method: linkObj.method
                };
            });
            
            // When approval_url is present, redirect user.
            if (links.hasOwnProperty('approval_url')) {
                // REDIRECT USER TO links['approval_url'].href
                res.redirect(links['approval_url'].href)
          } else {
            console.error('no redirect URI present');
          }
        }
      });
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer A21AAFM_qGlrnxxiOHYJWqEHuneA-jX_7HeycwLUhyCyVk6t8V-LrBek5fH59JMqDzu4P6Q5VGNOg9-XAerMzP36oKsuBlZ_g");
    // var init = {
    //     method: 'post',
    //     Headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer A21AAFM_qGlrnxxiOHYJWqEHuneA-jX_7HeycwLUhyCyVk6t8V-LrBek5fH59JMqDzu4P6Q5VGNOg9-XAerMzP36oKsuBlZ_g"
    //     },
    //     cache: 'default',
    //     intent: 'sale',
    //     redirect_urls: {
    //         "return_url": "http://localhost:3000/profile/transactions",
    //         "cancel_url": "http://localhost:3000/profile/cart"
    //     },
    //     payer: {
    //         "payment_method": "paypal"
    //     },
    //     transactions: [{
    //         "amount": {
    //         "total": '10',
    //         "currency": "USD"
    //         }
    //     }]
    // }

    // fetch('https://api.sandbox.paypal.com/v1/payments/payment',{init})
    // .then((res)=>{
    //     console.log(res)
    //     return res;
    // }).catch((err)=>{
    //     console.log(err)
    //     return err;
    // })
}

module.exports = {pay};