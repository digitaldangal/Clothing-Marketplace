const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8080;
const cors = require('cors')

app.listen(port, ()=>{
    console.log(`On port ${port}`)
}) 