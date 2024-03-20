const { Customer } = require("../../db");

const postCustomer = async function (CustomerData) {
    const [customer] = await Customer.findOrCreate({
        where: {
            firstname: CustomerData.firstname,
        },
        defaults: CustomerData,
    });

    return customer;
};

module.exports = postCustomer;