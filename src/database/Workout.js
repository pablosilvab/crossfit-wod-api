const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crossfit');

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