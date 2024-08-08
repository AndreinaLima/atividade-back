import { Router } from "express";
import { adicionarCurso, editarCurso, excluirCurso, listarCursos } from "../controladores/controladorCursos.js"

export const rotasCurso = Router()

rotasCurso.get("/cursos", listarCursos);

rotasCurso.post("/cursos/novo", adicionarCurso);

rotasCurso.put("/cursos/:id", editarCurso );

rotasCurso.delete("/cursos/:id", excluirCurso);
