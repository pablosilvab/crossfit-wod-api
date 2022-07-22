const mongoose = require('mongoose');

const Workouts = mongoose.model('Workouts', {
    name: String,
    mode: String,
    equipment: [String],
    exercises: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    trainerTips: [String]
});

const createNewWorkout = (newWorkout) => {
    try {
        mongoose.connect('mongodb://localhost:27017/crossfit');
        const workout = new Workouts({
            name: newWorkout.name,
            mode: newWorkout.mode,
            equipment: newWorkout.equipment,
            exercises: newWorkout.exercises,
            trainerTips: newWorkout.trainerTips
        });
        workout.save();
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};


module.exports = {
    createNewWorkout,
};