import { Router } from "express";
import { verificaLogin } from "../intermediarios/verificaLogin.js";
import * as alunoController from "../controladores/controladorAluno.js";

export const rotasAluno = Router();

rotasAluno.get("/alunos", alunoController.listarAlunos);

rotasAluno.get("/alunos/cursos", verificaLogin, alunoController.listarCursosDoAluno);

rotasAluno.get("/alunos/:id", alunoController.buscarAlunoPorId);

rotasAluno.post("/alunos", alunoController.criarAluno);

rotasAluno.post("/login", alunoController.loginAluno);

rotasAluno.put("/alunos/:id", alunoController.atualizarAluno);

rotasAluno.delete("/alunos/:id", alunoController.deletarAluno);
