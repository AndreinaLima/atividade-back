import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Endereco } from "./endereco.js";
import { curso } from "./curso.js";

export const aluno = connection.define("aluno", {
  matricula: {
    type: DataTypes.STRING(6),
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

aluno.hasOne(Endereco, {onDelete: "CASCADE"})
Endereco.belongsTo(aluno)

aluno.hasMany(curso, {onDelete: "CASCADE"})
curso.belongsTo(aluno)
