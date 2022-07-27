require('./config/config')

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const v1WorkoutRouter = require("./v1/routes/workoutRoutes")
const v1MemberRouter = require("./v1/routes/memberRoutes")

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRouter);


mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(PORT, () => {
    console.log(`API running in ${process.env.NODE_ENV} environtment. Listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});

module.exports = app;
