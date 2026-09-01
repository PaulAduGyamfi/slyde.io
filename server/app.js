const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/secure')
const cors = require('cors')

const app = express()

app.use(cors())

require('./models/User')
require('./models/Post')

mongoose.connect(MONGOURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb")
})
mongoose.connection.on('error', () => {
    console.log("did not connect error")
})


app.use(bodyParser.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(config.port, () => {
    console.log(`Server has started on port ${config.port}`)
})