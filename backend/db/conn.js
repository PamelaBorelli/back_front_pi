const mongoose = require("mongoose");
require('dotenv').config(); 

async function main(){
    try {
        mongoose.set("strictQuery", true)

        const user = process.env.MONGO_USER; // Acessa a variável de ambiente MONGO_USER
        const pass = process.env.MONGO_PASS; // Acessa a variável de ambiente MONGO_PASS

        // Usa as variáveis de ambiente na string de conexão
        const uri = `mongodb+srv://${user}:${pass}@cluster0.zoh2gvj.mongodb.net/?retryWrites=true&w=majority`;

        await mongoose.connect(uri); // Conecta ao MongoDB usando a string de conexão segura

        console.log("Conectado ao Banco!");

    } catch (error) {
        console.log(`Erro: ${error}`);
    }

}

module.exports = main
