const Workout = require("../database/Workout");
const Workouts = require("../database/workouts");

const getAllWorkouts = async (filterParams) => {
    try {
        const allWorkouts = await Workouts.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }
};

const getOneWorkout = async (workoutId) => {
    try {
        const workout = await Workouts.getOneWorkout(workoutId);
        return workout;
    } catch (error) {
        throw error;
    }
};

const createNewWorkout = (newWorkout) => {
    try {
        const createdWorkout = Workouts.createNewWorkout(newWorkout);
        return createdWorkout;
    } catch (error) {
        throw error;
    }
};

const updateOneWorkout = async (workoutId, changes) => {
    try {
        const updatedWorkout = await Workouts.updateOneWorkout(workoutId, changes);
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
        Workout.deleteOneWorkout(workoutId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};