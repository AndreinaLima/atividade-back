import { aluno } from "../models/aluno.js";
import { Endereco } from "../models/endereco.js";
import { curso } from "../models/curso.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const listarAlunos = async (req, res) => {
  try {
    const listaAlunos = await aluno.findAll();
    res.json(listaAlunos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar alunos' });
  }
};

export const listarCursosDoAluno = async (req, res) => {
  try {
    const alunoId = req.usuario;
    const alunoEncontrado = await aluno.findOne({
      where: { id: alunoId },
      include: [
        {
          model: curso,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: { exclude: ['senha', 'createdAt', 'updatedAt'] }
    });

    if (!alunoEncontrado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }

    res.json(alunoEncontrado.cursos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar cursos do aluno' });
  }
};

export const buscarAlunoPorId = async (req, res) => {
  try {
    const buscarAluno = await aluno.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'senha'] },
      include: [{
        model: Endereco,
        attributes: ['rua', 'numero', 'cidade', 'uf', 'cep']
      }],
    });

    if (buscarAluno) {
      res.json(buscarAluno);
    } else {
      res.status(404).json({ message: "Aluno não encontrado!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar aluno" });
  }
};

export const criarAluno = async (req, res) => {
  const { matricula, nome, email, telefone, endereco, senha } = req.body;
  try {
    const alunoExistente = await aluno.findOne({ where: { email } });

    if (alunoExistente) {
      return res.status(400).json({ message: "Aluno já cadastrado!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await aluno.create({
      matricula,
      nome,
      email,
      telefone,
      endereco,
      senha: senhaCriptografada
    }, { include: [Endereco] });

    res.json({ message: "Aluno criado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao inserir aluno." });
  }
};

export const loginAluno = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios!" });
  }

  try {
    const alunoEncontrado = await aluno.findOne({ where: { email } });

    if (!alunoEncontrado) {
      return res.status(404).json({ message: "Email não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(senha, alunoEncontrado.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign({ id: alunoEncontrado.id }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ usuario: alunoEncontrado.nome, token });
  } catch (err) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const atualizarAluno = async (req, res) => {
  const idAluno = req.params.id;
  const { matricula, nome, email, telefone, endereco } = req.body;

  try {
    const atualizarAluno = await aluno.findOne({ where: { id: idAluno } });

    if (atualizarAluno) {
      await Endereco.update(endereco, { where: { alunoId: idAluno } });
      await atualizarAluno.update({ matricula, nome, email, telefone });
      res.json({ message: "Aluno atualizado." });
    } else {
      res.status(404).json({ message: "Aluno não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar aluno." });
  }
};

export const deletarAluno = async (req, res) => {
  const idAluno = req.params.id;

  try {
    const deletarAluno = await aluno.findOne({ where: { id: idAluno } });

    if (deletarAluno) {
      await deletarAluno.destroy();
      res.json({ message: "Aluno removido com sucesso." });
    } else {
      res.status(404).json({ message: "Aluno não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir aluno" });
  }
};
