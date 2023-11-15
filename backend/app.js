const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://adm:pi%40123@cluster0.njnekqa.mongodb.net/')
    .then(() => console.log('Conexão com MongoDB estabelecida'))
    .catch(err => console.log('Erro de conexão com MongoDB:', err));

app.use(bodyParser.json());
app.use('/', routes);

const port = 8000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
