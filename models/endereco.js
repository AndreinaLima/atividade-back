
import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

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