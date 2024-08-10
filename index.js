import { connection, authenticate } from "./src/config/database.js"
import express from "express"
import { rotasAluno } from "./src/routers/alunos.js"
import { rotasCurso } from "./src/routers/cursos.js"
import { readFileSync } from "fs"
import path from "path"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

const app = express()
const PORT = process.env.PORT || 3000 // Usa a variável PORT do Render ou 3000 para desenvolvimento

// Testa a conexão com o banco de dados
authenticate(connection).then(() => {
  connection.sync()
})

// Configura o Swagger
const swaggerDocument = JSON.parse(
  readFileSync(path.resolve("api-docs", "swagger.json"), "utf8")
)

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" })) // Altere o origin para o domínio da sua aplicação front-end em produção

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(rotasAluno)
app.use(rotasCurso)

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`)
  console.log(
    `Documentação Swagger disponível em http://localhost:${PORT}/api-docs`
  )
})
