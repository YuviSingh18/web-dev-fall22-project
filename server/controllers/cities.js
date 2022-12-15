const express = require('express');
const cities = require('../models/cities');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded());

app
    .get('/', (req, res, next) => {
        cities.getStates(req.body)
            .then(x => res.status(200).send(x))
            .catch(next);
    })


module.exports = app;