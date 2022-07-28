const request = require('supertest')
const app = require('../src/index')

describe("GET /workouts", () => {
    it("respond with json containing a list of all workouts", (done) => {
        request(app)
            .get("/api/v1/workouts")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
