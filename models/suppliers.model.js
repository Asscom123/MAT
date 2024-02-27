import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const suppliers = getData.sequelizeClient.define(
    "suppliers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        mayorista: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        asesor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactoDePago: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RFC: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numCliente: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Ingrese un correo electrónico válido',
                },
            },
        },
        banco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cuenta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clabe: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        diasCred: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        diasPP: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        PP: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "suppliers",
        freezeTableName: true,
    }
);

export const getSuppliers = suppliers;