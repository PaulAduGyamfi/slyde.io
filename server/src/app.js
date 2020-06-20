const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config/config')
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/secure')




require('./models/User')


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb")
})
mongoose.connection.on('error', () => {
    console.log("did not connect error")
})


app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})