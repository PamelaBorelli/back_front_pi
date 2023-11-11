var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dadosSolaresSchema = new Schema({
  air_temp: Number,
  dni: Number,
  ghi: Number,
  period_end: Date,
  period: String,
});

module.exports = mongoose.model('DadosSolares', dadosSolaresSchema);