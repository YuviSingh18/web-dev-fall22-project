const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app 
    .get('/', (req, res) => {
        res.status(200).send(workouts.getWorkouts());
    })

    .get('/:id', (req, res) => {

        const workout = workouts.getWorkout(+req.params.id);

        if (!workout) {
            res.status(404).send('Workout not found');
        } else {
            res.status(200).send(workout);
        }
    })

    .get('/delete/:id', (req, res) => {
        
        workouts.deleteWorkout(+req.params.id);
        res.status(200).send('Workout deleted');
    });

module.exports = app;