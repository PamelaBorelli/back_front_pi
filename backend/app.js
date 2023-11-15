const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://adm:pi%40123@cluster0.njnekqa.mongodb.net/meuBancoDeDados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexão com MongoDB estabelecida'))
  .catch(err => console.log('Erro de conexão com MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
