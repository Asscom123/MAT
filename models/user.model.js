// user.model.js
import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

const saltRounds = 10; // Número de rounds para la generación del hash

const users = getData.sequelizeClient.define(
    "users", {
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
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Ingrese un correo electrónico válido',
                },
            },
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
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
        rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [
                        [1, 2]
                    ],
                    msg: 'El campo rol debe ser 1 para administrador o 2 para usuario',
                },
            },
        },
    }, {
        tableName: "user",
        freezeTableName: true,
        hooks: {
            beforeCreate: async(user) => {
                user.contrasena = await bcrypt.hash(user.contrasena, saltRounds);
            },
            beforeUpdate: async(user) => {
                if (user.changed('contrasena')) {
                    user.contrasena = await bcrypt.hash(user.contrasena, saltRounds);
                }
            },
        },
    }
);

export const getUsers = users;