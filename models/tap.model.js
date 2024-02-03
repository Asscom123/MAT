import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const tap = getData.sequelizeClient.define(
    "tap", {
        idTap: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fechaI: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fechaL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descripcionDT: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        acciones: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        personalDA: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        potencial: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plazo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prioridad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "activo",
        },
        fechaF: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "tap",
        freezeTableName: true,
    }
);

export const getTaps = { tap };