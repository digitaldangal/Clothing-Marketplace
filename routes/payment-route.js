const express = require('express');
const payment = express.Router();
const paymentHelper = require('../services/payment-helper');

payment.post('/', paymentHelper.pay);
payment.post('/process', paymentHelper.approved);

module.exports = payment;