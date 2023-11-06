const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

//DB connection
const conn = require("./db/conn")
conn()

//routes
const routes = require("./routes/router")
app.use("/api", routes)

app.listen(5000, function (){
    console.log("servidor online")
})
