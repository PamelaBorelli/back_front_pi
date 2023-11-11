const express = require("express");
const router = express.Router();

// Importe os roteadores específicos
const dadosSolaresRouter = require("./dadosSolares");
const usuarioRouter = require("./usuario");

// Defina as rotas específicas usando os roteadores importados
router.use("/dadosSolares", dadosSolaresRouter);
router.use("/usuarios", usuarioRouter);

module.exports = router;
