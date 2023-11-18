const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes/router');
const swaggerJsdoc = require('swagger-jsdoc');

mongoose.connect('mongodb+srv://adm:pi%40123@cluster0.njnekqa.mongodb.net/meuBancoDeDados')
  .then(() => console.log('Conexão com MongoDB estabelecida'))
  .catch(err => console.log('Erro de conexão com MongoDB:', err));

  var swaggerDefinition = {
    info: {
        title: "Solaire",
        version: "1.0.0",
        description: "Documentação Solaire",
    },
    components: {
        schemas: "",
    },
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js']
}

var swaggerAspec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAspec));

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
