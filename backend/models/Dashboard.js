const mongoose = require('mongoose');

const { Schema } = mongoose;

const dashboardSchema = new Schema({
  air_temp: Number,
  dni: Number,
  ghi: Number,
  period_end: Date,
  period: String
})

const Dashboard = mongoose.model("Dashboard", dashboardSchema)

module.exports = {Dashboard , dashboardSchema};
