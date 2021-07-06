'use strict';
const axios = require('axios');

const { drinksModel } = require('../models/drinks.model');

const getAll = async (req, res) => {
    await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
        .then(response => {
            res.send(response.data.drinks);
        })
        .catch(error => console.log(error.message));
}

const addFav = async (req, res) => {
    const {
        strDrink,
        strDrinkThumb,
        idDrink
    } = req.body;
    drinksModel.find({ idDrink: idDrink }, (error, data) => {
        if (error) {
            res.send(error.message);
        }
        else {
            if (data.length > 0) {
                drinksModel.find({}, (error, data) => {
                    if (error) {
                        res.send(error.message)
                    }
                    else {
                        res.send(data)
                    }
                })
            }
            else {
                const newDrink = new drinksModel({ strDrink, strDrinkThumb, idDrink });
                newDrink.save().then(
                    drinksModel.find({}, (error, data) => {
                        if (error) {
                            res.send(error.message)
                        }
                        else {
                            res.send(data)
                        }
                    })
                )
            }
        }
    })


}

const getFav = async (req, res) => {
    drinksModel.find({}, (error, data) => {
        if (error) {
            res.send(error.message)
        }
        else {
            res.send(data)
        }
    })
}

const updateFav = async (req, res) => {
    const {
        strDrink,
        strDrinkThumb,
        idDrink
    } = req.body;
    drinksModel.findOne({ idDrink: idDrink }, (error, data) => {
        if (error) {
            res.send(error.message);
        }
        else {
            data.strDrink = strDrink;
            data.strDrinkThumb = strDrinkThumb;
            data.save().then(
                drinksModel.find({}, (error, data) => {
                    if (error) {
                        res.send(error.message)
                    }
                    else {
                        res.send(data)
                    }
                })
            )
        }
    })
}

const deleteFav = async (req, res) => {
    const idDrink = req.query.idDrink;
    drinksModel.deleteOne({ idDrink: idDrink }, (error, data) => {
        if (error) {
            res.send(error.message);
        }
        else {
            drinksModel.find({}, (error, data) => {
                if (error) {
                    res.send(error.message)
                }
                else {
                    res.send(data)
                }
            })
        }
    })
}


module.exports = { getAll, addFav, getFav, updateFav, deleteFav }