const express = require('express');
const payment = express.Router();
const paymentHelper = require('../services/payment-helper');

payment.post('/process', paymentHelper.approved);
payment.post('/', paymentHelper.pay);

module.exports = payment;