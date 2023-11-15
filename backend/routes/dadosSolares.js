const express = require('express');
const router = express.Router();
var DadosSolares = require('../models/dadosSolares');

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

// // Rota para obter dados solares com filtros
// router.get('/', async function (req, res) {
// try {
//     const dadosSolares = await DadosSolares.find();
//     console.log(dadosSolares.length)
//     res.json(dadosSolares);
// } catch (err) {
//     res.status(500).send(err);
// }
// });


// Rota para obter dados solares com filtros
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



