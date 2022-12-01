const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded());

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
        workouts.deleteWorkout(+req.params.id)
        .then(() => res.sendStatus(204))
    })

    .post('/', (req, res) => {
        const newService = req.body;
        try {
            workouts.addWorkout(newService);
            res.status(200).json("Added");
        } catch (err) {
            res.status(500).json(err);
    }
    });

module.exports = app;