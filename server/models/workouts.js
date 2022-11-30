const data = require('../data/workouts.json');
const { connect } = require('./mongo');

async function collection() {
    const client = await connect();
    return client.db('Fitness').collection('workouts');
}

async function getWorkouts() {
    const db = await collection();
    const data = await db.find().toArray();
    return data;
}

async function getWorkout(id) {
    const db = await collection();
    const data = await db.findOne({ id: id });
    return data;
}

async function deleteWorkout(id) {
    const db = await collection();
    await db.deleteOne({ id: id });
}

async function addWorkout(workout) {
    const db = await collection();
    await db.insertOne(workout);
}

module.exports = {
    collection,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    addWorkout
};