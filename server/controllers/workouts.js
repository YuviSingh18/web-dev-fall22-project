const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app 
    .get('/', (req, res, next) => {
        workouts.getWorkouts()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })

    .get('/:id', (req, res) => {
        workouts.getWorkout(+req.params.id)
        .then(workout => {
            if (workout) {
                res.status(200).send(workout);
            } else {
                res.status(404).send({ error: 'Workout not found' });
            }
        })
    })

    .delete('/:id', (req, res) => {
        workouts.deleteWorkout(+req.params.id);
        res.status(204).send();
    })

    .post('/', (req, res) => {
        workouts.addWorkout(req.body);
        res.status(201).send();
    });

module.exports = app;