const { DataTypes } = require('sequelize');

const Admin = (sequelize) => {
    sequelize.define('Admin', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mercadoPagoClientId: {
            type: DataTypes.STRING,
            allowNull: true // Puedes ajustar esta restricción según tus necesidades
        },
        mercadoPagoClientSecret: {
            type: DataTypes.STRING,
            allowNull: true // Puedes ajustar esta restricción según tus necesidades
        },
    }, { timestamps: false });
};

module.exports = Admin;