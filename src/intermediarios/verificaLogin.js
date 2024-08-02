import jwt from "jsonwebtoken";
import {aluno} from '../models/aluno.js'; 


export const verificaLogin = async (req, res, next) => {
 
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não Autorizado' });
  }

  const token = authorization.split(' ')[1];


  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`ID extraído do token: ${id}`);

    const alunoEncontrado = await aluno.findByPk(id);
    if (!alunoEncontrado) {
      console.log(`Aluno com ID ${id} não encontrado no banco de dados`);
      return res.status(401).json({ mensagem: 'Não Autorizado' });
    }

    req.usuario = id;
    
    next();
  } catch (err) {
    console.error(`Erro ao verificar o token: ${err}`);
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};
