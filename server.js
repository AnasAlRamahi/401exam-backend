'use strict';
const express = require('express') // require the express package
const app = express() // initialize your express app instance

require('dotenv').config();
const cors = require('cors');
app.use(cors()) // after you initialize your express app instance
app.use(express.json());
const axios = require('axios'); // require the package
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/drinks", { useNewUrlParser: true });

const { getAll, addFav, getFav, updateFav, deleteFav } = require("./controllers/drinks.controllers")

// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })

app.get('/getAll', getAll);

app.post('/addFav', addFav);
app.get('/getFav', getFav);
app.put('/updateFav', updateFav);
app.delete('/deleteFav', deleteFav);

app.listen(PORT) // kick start the express server to work