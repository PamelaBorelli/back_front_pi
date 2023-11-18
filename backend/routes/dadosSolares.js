const express = require('express');
const router = express.Router();
var DadosSolares = require('../models/dadosSolares');

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
 */

/**
 * @swagger
 * /dados-solares:
 *   post:
 *     summary: Insere uma lista de dados solares
 *     tags: [Dados Solares]
 *     requestBody:
 *       description: Lista de dados solares a serem inseridos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DadosSolares'
 *     responses:
 *       201:
 *         description: Lista de dados solares inserida com sucesso
 *       400:
 *         description: Formato de lista inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/')
.post(async function (req, res) {
    try {
        const listaDadosSolares = req.body; // Assumindo que a lista de dados solares é enviada no corpo da solicitação em formato JSON
    
        // Verifique se a lista está no formato apropriado antes de salvar
        if (!Array.isArray(listaDadosSolares)) {
            return res.status(400).json({ message: 'Formato de lista inválido' });
        }
    
        // Insira cada item na lista no banco de dados
        for (const dadoSolar of listaDadosSolares) {
            const novoDadoSolar = new DadosSolares(dadoSolar); // Use DadosSolares aqui
            await novoDadoSolar.save();
        }
    
        res.status(201).json({ message: 'Lista de dados solares inserida com sucesso' });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /dados-solares:
 *   get:
 *     summary: Obtém dados solares com base em filtros de data
 *     tags: [Dados Solares]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         description: |
 *           Data de início para filtrar os dados solares (formato: YYYY-MM-DD)
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         description: |
 *           Data de término para filtrar os dados solares (formato: YYYY-MM-DD)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados solares filtrados com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', async function (req, res) {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const dadosSolares = await DadosSolares.find({ period_end: { $gte: startDate, $lte: endDate } });
        console.log(dadosSolares.length)
        res.json(dadosSolares);
    } catch (err) {
        res.status(500).send(err);
    }
    });
    

/**
 * @swagger
 * /dados-solares:
 *   delete:
 *     summary: Exclui todos os dados solares
 *     tags: [Dados Solares]
 *     responses:
 *       200:
 *         description: Todos os dados solares excluídos com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.route('/')
.delete(async function (req, res) {
    try {
        await DadosSolares.deleteMany({});
        res.json({ message: 'Todos os dados solares foram excluídos com sucesso!' });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;



