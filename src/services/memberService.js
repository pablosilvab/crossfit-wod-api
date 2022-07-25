const Members = require("../database/Member");

const createNewMember = async (newMember) => {
    try {
        const createdMember = await Members.createNewMember(newMember);
        return createdMember;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createNewMember
};