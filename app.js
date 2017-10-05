const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

mongoose.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log(`Server on port: ${port}`);
}) 

const brandRoutes = require('./routes/brand-routes');
app.use('/brand', brandRoutes);