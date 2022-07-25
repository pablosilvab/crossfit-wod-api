const memberService = require("../services/memberService");

const createNewMember = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password'",
            },
        });
        return;
    }
    const newMember = {
        name: body.name,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        password: body.password,
    };

    try {
        const createdMember = await memberService.createNewMember(newMember);
        res.status(201).send({ status: "OK", data: createdMember });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


module.exports = {
    createNewMember: createNewMember
};