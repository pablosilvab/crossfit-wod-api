const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const v1WorkoutRouter = require("./v1/routes/workoutRoutes")
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

mongoose.connect('mongodb://localhost:27017/crossfit', (err, res) => {
    if (err) throw err;
    console.log("BD Online");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});