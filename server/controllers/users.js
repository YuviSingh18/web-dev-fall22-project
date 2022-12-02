const express = require('express');
const users = require('../models/users');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded());

app
    .get('/', (req, res, next) => {
        users.getUsers()
            .then(x => res.status(200).send(x))
            .catch(next);
    })

    .get('/:id', (req, res) => {
        users.getUser(+req.params.id)
            .then(user => {
                if (user) {
                    res.status(200).send(user);
                } else {
                    res.status(404).send({ error: 'User not found' });
                }
            })
    })

    .delete('/:id', (req, res) => {
        console.log(+req.params.id);
        users.deleteUser(+req.params.id)
            .then(() => res.status(200).send({ success: 'User deleted' }))
    })

    .post('/', (req, res) => {
        const newUser = req.body;
        try {
            users.addUser(newUser);
            res.status(200).json("Added");
        } catch (err) {
            res.status(500).json(err);
        }
    })

    .post('/login', (req, res) => {
        const user = req.body;
        try {
            users.login(user).then(x => res.status(201).send(x));
        } catch (err) {
            res.status(500).json(err);
        }
    })

    .patch('/:id', (req, res) => {
        const user = req.body;
        users.updateUser(+req.params.id, user)
            .then(() => res.status(200).send({ success: 'User updated' }))
    })
    

module.exports = app;