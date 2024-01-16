import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const user = getData.sequelizeClient.define(
    "user", {
        idUsuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apellidoP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apellidoM: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: {
                    msg: 'Ingrese un correo electrónico válido',
                },
            },
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numCel: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: 'El número de celular debe contener solo dígitos numéricos',
                },
            },
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        horarioDeTrabajo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName: "user",
        freezeTableName: true,
    }
);

export const getUsers = { user };