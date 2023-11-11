// app/models/usuario.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nome: String,
    email: String,
    login: String,
    senha: String,
    token: String,
    dataInscricao: Date
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
