const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 8080;

require('dotenv').config();

app.listen(port, ()=>{
    console.log(`On port ${port}`)
    console.log(process.env.mongodb_uri)
}) 