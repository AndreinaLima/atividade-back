import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const curso = connection.define("curso", {
    tiposDeCursos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    modulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
  });