const express = require('express');
const router = express.Router();
var Usuario = require('../models/Usuarios');
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();
const jwt = require('jsonwebtoken');
const secretKey = 'M^E&!e8Xo^W0M5Y%zNz$1Fqy@6#HbEzY';

passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         senha:
 *           type: string
 *           format: password
 *         dataNascimento:
 *           type: string
 *           format: date
 *       required:
 *         - nome
 *         - email
 *         - senha
 *
 *     DadosSolares:
 *       type: object
 *       properties:
 *         air_temp:
 *           type: number
 *         dni:
 *           type: number
 *         ghi:
 *           type: number
 *         period_end:
 *           type: string
 *           format: date-time
 *         period:
 *           type: string
 *       required:
 *         - air_temp
 *         - dni
 *         - ghi
 *         - period_end
 *         - period
 *
 *     NovoUsuario:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         senha:
 *           type: string
 *           format: password
 *         dataNascimento:
 *           type: string
 *           format: date
 *       required:
 *         - nome
 *         - email
 *         - senha
 */


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario' 
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Já existe um usuário com esse email ou a senha não atende aos critérios de força
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/')
    .post(async function (req, res) {
        var usuario = new Usuario();
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;
        usuario.dataInscricao = new Date();

        const existingUser = await Usuario.findOne({ email: usuario.email });

        if (existingUser) {
            res.status(400).json({ message: 'Já existe um usuário com esse email.' });
        } else {
            const senhaValida = passwordSchema.validate(req.body.senha);

            if (!senhaValida) {
                res.status(400).json({ message: 'A senha não atende aos critérios de força.' });
            } else {
                try {
                    usuario.token = gerarToken(usuario);
                    console.log("1")
                    await usuario.save();
                    res.json({ message: 'Usuário criado com sucesso!' });
                } catch (err) {
                    res.status(500).send(err);
                }
            }
        }
    })

     /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Obtém todos os usuários
     *     tags: [Usuarios]
     *     responses:
     *       200:
     *         description: Lista de usuários
     *       500:
     *         description: Erro interno do servidor
     */

    .get(verificarToken, async function (req, res) {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (err) {
            res.status(500).send(err);
        }
    })

     /**
     * @swagger
     * /usuarios:
     *   delete:
     *     summary: Exclui todos os usuários
     *     tags: [Usuarios]
     *     responses:
     *       200:
     *         description: Todos os usuários foram excluídos com sucesso
     *       500:
     *         description: Erro interno do servidor
     */
    .delete(verificarToken, async function (req, res) {
        try {
            await Usuario.deleteMany({});
            res.json({ message: 'Todos os usuários foram excluídos com sucesso!' });
        } catch (err) {
            res.status(500).send(err);
        }
    });

/**
 * @swagger
 * /usuarios/{usuario_id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/:usuario_id')
    .delete(verificarToken, async function (req, res) {
        try {
            await Usuario.deleteOne({ _id: req.params.usuario_id });
            res.json({ message: 'Usuário excluído com sucesso!' });
        } catch (err) {
            res.status(500).send(err);
        }
    });


/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - login
 *               - senha
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *       401:
 *         description: Usuário não encontrado ou login/senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/login')
    .post(async function (req, res) {
        const { login, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ login });

            if (!usuario) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            const senhaValida = passwordSchema.validate(senha);

            if (!senhaValida || usuario.senha !== senha) {
                return res.status(401).json({ message: 'Login ou senha inválidos' });
            }

            const token = gerarToken(usuario);

            res.json({ token });
        } catch (err) {
            res.status(500).send(err);
        }
    });

function gerarToken(usuario) {
    const dataCriacao = new Date();
    const tresMesesEmSegundos = 3 * 30 * 24 * 60 * 60; // 3 meses em segundos
    const prazoValidade = Math.floor(dataCriacao / 1000) + tresMesesEmSegundos;
    const token = jwt.sign(
        { id: usuario._id, email: usuario.email, dataCriacao: dataCriacao },
        secretKey,
        { expiresIn: prazoValidade }
    );
    return token;
}

function verificarToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.id;

        next();
    });
}


module.exports = router;