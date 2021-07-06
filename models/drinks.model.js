'use strict';
const mongoose = require("mongoose");

const drinksSchema = new mongoose.Schema({
    strDrink: {
        type: String,
        required: true
    },
    strDrinkThumb: {
        type: String,
        required: false
    },
    idDrink: {
        type: String
    }
});

const drinksModel = mongoose.model("drinks", drinksSchema);


module.exports = { drinksModel };
