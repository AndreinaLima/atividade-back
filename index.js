import { connection, authenticate } from "./src/config/database.js";
import express from "express";
import { rotasAluno } from "./src/routers/alunos.js";
import { rotasCurso } from "./src/routers/cursos.js";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";


authenticate(connection).then (() =>{
    connection.sync();
    });
    
const swaggerDocument = JSON.parse(
      readFileSync(path.resolve('api-docs', 'swagger.json'), 'utf8')
    );

const app = express()
app.use(express.json())

app.use(cors({ origin: "http://localhost:5173" }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(rotasAluno);
app.use(rotasCurso);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
  console.log('Documentação Swagger disponível em http://localhost:3000/api-docs');
})