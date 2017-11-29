require('isomorphic-fetch');
require('dotenv').config();
var paypal = require('paypal-rest-sdk');

let PaypalAccessToken = process.env.PaypalAccessToken;
let PayPalClient_id = process.env.PayPalClient_id;
let PayPalClient_Secret = process.env.PayPalClient_Secret;
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': PayPalClient_id,
    'client_secret': PayPalClient_Secret,
  });

function pay (req, res, next) {
    var payReq = JSON.stringify({
        intent: 'authorize',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: 'http://localhost:3000/profile/process-payment/process',
          cancel_url: 'http://localhost:3000/profile/cart'
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
                // res.redirect(links['approval_url'].href)
                res.send()
          } else {
            console.error('no redirect URI present');
          }
        }
      })
};

function approved(req, res){
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };
    var authid;
    
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
      if (error) {
        console.error(JSON.stringify(error));
      } else {
        if (payment.state === 'approved'
        && payment.transactions
        && payment.transactions[0].related_resources
        && payment.transactions[0].related_resources[0].authorization) {
          // Capture authorization.
          authid = payment.transactions[0].related_resources[0].authorization.id;
        } else {
          console.log('payment not successful');
        }
      }
    });
}


module.exports = {pay, approved};