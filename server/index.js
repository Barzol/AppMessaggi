const express = require('express')
const mongoose = require('mongoose').default
const cors = require('cors')
const router = require('./routes/auth')
require('./models/users')
require('./models/chats')
require('./models/messages')

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", router)

mongoose.connect('mongodb+srv://dehvid:GbJgzojiMXIEjm59@eswalbelly.cm7zzgd.mongodb.net/ProgettoWeb', {
    /*
    useNewUrlParser: true,
    useUnifiedTopology: true
    */

}).then(() => {
    console.log('Connessione al DB')
}).catch((error) =>{
    console.log(error)
})

const server = app.listen(3000, () => {
    console.log('Server Online sulla porta 3000')
})