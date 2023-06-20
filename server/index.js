const express = require('express')
const mongoose = require('mongoose').default
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routes/auth')

dotenv.config()
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())

app.use("/auth", router)

mongoose.connect(process.env.MONGO_URL, {

}).then(() => {
    console.log('Connessione al DB')
}).catch((error) =>{
    console.log(error)
})

const db = mongoose.connection
db.once("open", () => {
    console.log("Connesso al DB")
    app.listen(4000, () => {
        console.log("App in ascolto")
    })
})