const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.listen(port, () => {
  console.log('Server started on port', port);
})

const emailRoutes = require('./routes/email-routes');
app.use('/contact-submit', emailRoutes);

const paymentRoutes = require('./routes/payment-route');
app.use('/process-payment', paymentRoutes);

app.get('*',(req,res)=>{
    res.status(400).json({
        message: 'Not found!',
      });
});