const data = require('../data/workouts.json');

function getWorkouts() {
    return data;
}

function getWorkout(id) {
    return data.workouts.find(workout => workout.id === id);
}

function deleteWorkout(id) {
    data.workouts = data.workouts.filter(workout => workout.id !== id);
}

module.exports = {
    getWorkouts,
    getWorkout,
    deleteWorkout
};