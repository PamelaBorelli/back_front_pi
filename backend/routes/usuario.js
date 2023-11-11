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

    .get(verificarToken, async function (req, res) {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    .delete(verificarToken, async function (req, res) {
        try {
            await Usuario.deleteMany({});
            res.json({ message: 'Todos os usuários foram excluídos com sucesso!' });
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.route('/:usuario_id')
    .delete(verificarToken, async function (req, res) {
        try {
            await Usuario.deleteOne({ _id: req.params.usuario_id });
            res.json({ message: 'Usuário excluído com sucesso!' });
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
    const token = req.headers.authorization; // Assumindo que o token é enviado no cabeçalho 'Authorization'

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // O token é válido, você pode adicionar os dados decodificados (por exemplo, o ID do usuário) ao objeto de solicitação
        req.userId = decoded.id;

        // Continue com a próxima função de middleware ou a rota protegida
        next();
    });
}


module.exports = router;
