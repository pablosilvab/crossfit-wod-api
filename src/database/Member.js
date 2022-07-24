const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crossfit');


/**
 * @openapi
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Peter Doe
 *         gender:
 *           type: string
 *           example: M
 *         dateOfBirth:
 *           type: string
 *           example: 27/03/1994
 *         email:
 *           type: string
 *           example: test@email.com
 *         password:
 *           type: string
 *           example: 12345
 */
const Members = mongoose.model('Members', {
    name: String,
    gender: String,
    dateOfBirth: String,
    email: String, 
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const createNewMember = async (newMember) => {
    try {
        const member = new Members({
            name: newMember.name,
            gender: newMember.gender,
            dateOfBirth: newMember.dateOfBirth,
            email: newMember.email,
            password: newMember.password
        });
        await member.save();

        return member;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};


module.exports = {
    createNewMember
};