// const mongoose = require("mongoose");
// require('dotenv').config(); 

// async function main(){
//     try {
//         mongoose.set("strictQuery", true)

//         const user = process.env.MONGO_USER; 
//         const pass = process.env.MONGO_PASS; 

     
//         const uri = `mongodb+srv://${user}:${pass}@cluster0.zoh2gvj.mongodb.net/?retryWrites=true&w=majority`;

//         await mongoose.connect(uri); 

//         console.log("Conectado ao Banco!");

//     } catch (error) {
//         console.log(`Erro: ${error}`);
//     }

// }

// module.exports = main

const mongoose = require("mongoose");
require('dotenv').config(); 

async function main(){
    try {
        mongoose.set("strictQuery", true)

        const user = process.env.MONGO_USER; 
        const pass = process.env.MONGO_PASS; 
        const dbName = 'Dashboard'; 

        const uri = `mongodb+srv://${user}:${pass}@cluster0.zoh2gvj.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        await mongoose.connect(uri); 

        console.log("Conectado ao Banco!");

    } catch (error) {
        console.log(`Erro: ${error}`);
    }

}

module.exports = main

