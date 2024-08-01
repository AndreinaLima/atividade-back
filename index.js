import { connection, authenticate } from "./src/config/database.js";
import express from "express";
import { rotasAluno } from "./src/routers/alunos.js";

authenticate(connection).then (() =>{
    connection.sync();
    });

const app = express()
app.use(express.json())

app.use(rotasAluno);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/")
})