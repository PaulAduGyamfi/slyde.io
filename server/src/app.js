const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/secure')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


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







io.on('connection', (socket)=>{
    console.log('new connection!!')

    socket.on('join', ({name,room}) =>{
        console.log(name,room)
    })


    socket.on('disconnect', ()=>{
        console.log('user has left!!')
    })

})







app.use(bodyParser.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


server.listen(config.port, () => {
    console.log(`Server has started on port ${config.port}`)
})