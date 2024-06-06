const { Customer } = require("../../db");

const postCustomer = async function (CustomerData) {
    console.log('POST CUSTOMER', CustomerData);

    const [customer, created] = await Customer.findOrCreate({
        where: { email: CustomerData.email }, // Condición para buscar o crear un cliente basado en su correo electrónico
        defaults: {
            fullname: CustomerData.fullname, 
            image: CustomerData.image, 
            email: CustomerData.email,
            phone: CustomerData.phone, 
            address: CustomerData.address, 
            password: CustomerData.password
        }
    });
    console.log(customer, 'customer');
    console.log(created, 'created');

    return customer;
};

module.exports = postCustomer;