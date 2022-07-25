const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crossfit');


/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Dead Push-Ups
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
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


const getOneWorkout = async (workoutId) => {
    try {
        const workout = await Workouts.findById(workoutId, { __v: 0 })
        if (!workout) {
            throw {
                status: 404,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};


const getAllWorkouts = async (filterParams) => {
    try {
        return await Workouts.find({ __v: 0 });
    } catch (error) {
        throw { status: 500, message: error };
    }
};


const updateOneWorkout = async (workoutId, changes) => {
    try {
        const workoutByName = await Workouts.findOne({ 'name': changes.name });
        if (workoutByName) {
            throw {
                status: 400,
                message: `Workout with the name '${changes.name}' already exists`,
            };
        }
        const workoutById = await Workouts.findById(workoutId)
        if (!workoutById) {
            throw {
                status: 404,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }

        var res = await Workouts.findByIdAndUpdate({ _id: workoutId }, {
            name: changes.name,
            mode: changes.mode,
            equipment: changes.equipment,
            exercises: changes.exercises,
            trainerTips: changes.trainerTips,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        })

        return res;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};


const deleteOneWorkout = async (workoutId) => {
    try {

        const workoutById = await Workouts.findById(workoutId)
        if (!workoutById) {
            throw {
                status: 404,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        await Workouts.findByIdAndDelete(workoutId)

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    createNewWorkout,
    getOneWorkout,
    getAllWorkouts,
    updateOneWorkout,
    deleteOneWorkout
};