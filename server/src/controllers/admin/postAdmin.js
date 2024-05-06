const { Admin } = require("../../db");

const postAdmin = async function (AdminData) {
    const [admin] = await Admin.findOrCreate({
        where: {
            username: AdminData.username,
        },
        defaults: AdminData,
    });

    return admin;
};

module.exports = postAdmin;