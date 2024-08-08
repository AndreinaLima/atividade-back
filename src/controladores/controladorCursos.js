import { curso } from "../models/curso.js";

export const listarCursos = async (req, res) => {
    try {
        const listaCurso = await curso.findAll();
        res.json(listaCurso);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar Cursos' });
    }

};

export const adicionarCurso = async (req, res) => {
    try {
        const { tiposDeCursos, modulo } = req.body;


        if (!tiposDeCursos || !modulo) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }


        const novoCurso = await curso.create({
            tiposDeCursos,
            modulo,
        });

        res.status(201).json(novoCurso);
    } catch (err) {
        console.error('Erro ao adicionar curso:', err);
        res.status(500).json({ message: 'Erro ao adicionar curso' });
    }
};

export const editarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { tiposDeCursos, modulo } = req.body;

        const cursoExistente = await curso.findByPk(id);
        if (!cursoExistente) {
            return res.status(404).json({ message: 'Curso não encontrado' }); 
        }

        await curso.update(
            { tiposDeCursos, modulo },
            { where: { id } }
        );
        const cursoAtualizado = await curso.findByPk(id);

        res.status(200).json({
            message: 'Curso atualizado com sucesso',
            curso: cursoAtualizado
        });
    } catch (err) {
        console.error('Erro ao editar curso:', err);
        res.status(500).json({ message: 'Erro ao editar curso' });
    }
};


export const excluirCurso = async (req, res) => {
    try {
        const { id } = req.params;


        const cursoExistente = await curso.findByPk(id);
        if (!cursoExistente) {
            return res.status(404).json({ message: 'Curso não encontrado' });
        }


        await curso.destroy({
            where: { id },
        });

        res.status(200).json({ message: 'Curso excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir curso:', err);
        res.status(500).json({ message: 'Erro ao excluir curso' });
    }
};

