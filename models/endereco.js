
import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { aluno } from "./aluno.js";
import { curso } from "./curso.js";

export const endereco = connection.define("endereco", {

    uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    
    cidade: { 
        type: DataTypes.STRING,
        allowNull: false,
    },

    cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
    },

    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    numero: { 
        type: DataTypes.STRING,
        defaultValue: "S/N",
    },

    complemento: { 
        type: DataTypes.STRING,
        defaultValue: "Sem complemento",
    },
});

endereco.hasOne(aluno);
aluno.belongsTo(endereco);

endereco.hasMany(curso);
curso.belongsTo(endereco);