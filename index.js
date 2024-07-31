import { connection, authenticate } from "./config/database.js";

import {aluno} from "./models/aluno.js";
import {Endereco} from "./models/endereco.js";
import {curso} from "./models/curso.js";
import express from "express"

authenticate(connection).then (() =>{
    connection.sync();
    });

const app = express()
app.use(express.json())

app.get("/alunos", async (req, res) => {
    const listaAlunos = await aluno.findAll()
  res.json(listaAlunos)
})

app.get("/alunos/:id", async (req, res) => {
    const buscarAluno = await aluno.findOne({
      where: { id: req.params.id },
      include: [Endereco],
    })

    if (buscarAluno) {
      res.json(buscarAluno)
    } else {
      res.status(404).json({ message: "Aluno não encontrado!" })
    }
})

app.post("/alunos", async (req, res) => {
  const { matricula, nome, email, telefone, endereco } = req.body

  try {
    await aluno.create(
      { matricula, nome, email, telefone, endereco },
      { include: [Endereco] }
    )
    res.json({ message: "Aluno criado com sucesso." })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Um erro ocorreu ao inserir aluno." })
  }
})


app.put("/alunos/:id", async (req, res) => {
  const idAluno = req.params.id
  const { matricula, nome, email, telefone, endereco } = req.body

  try {
    const atualizarAluno = await aluno.findOne({ where: { id: idAluno } })

    if (atualizarAluno) {
      await Endereco.update(endereco, { where: { alunoId: idAluno } })
      await atualizarAluno.update({ matricula, nome, email, telefone })
      res.json({ message: "Aluno atualizado." })
    } else {
      res.status(404).json({ message: "O Aluno não foi encontrado." })
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao atualizar o aluno." })
  }
})

app.delete("/alunos/:id", async (req, res) => {
  const idAluno = req.params.id

  try {
    const deletarAluno = await aluno.findOne({ where: { id: idAluno } })

    if (deletarAluno) {
      await deletarAluno.destroy()
      res.json({ message: "Aluno removido com sucesso." })
    } else {
      res.status(404).json({ message: "Aluno não encontrado." })
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao excluir aluno" })
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/")
})