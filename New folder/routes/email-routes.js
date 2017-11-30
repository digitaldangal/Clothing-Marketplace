const express = require('express');
const email = express.Router();
const emailHelper = require('../services/email-helper');

email.post('/', emailHelper.contactEmail);

module.exports = email;