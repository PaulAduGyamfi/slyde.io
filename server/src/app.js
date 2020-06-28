const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/secure')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUserInRoom } =require('./chatUsers')

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

    socket.on('join', ({name,room, image}, callback) =>{

        // console.log(image)
       const {error, user} = addUser({id:socket.id, name, room,image})

       if(error){
        return callback(error)
       }

       socket.emit('message', {user:'🤖SlydeBOT', text:`Hi @${user.name}! Welcome to the ${user.room} chatroom`})
       socket.broadcast.to(user.room).emit('message',{user:'🤖SlydeBOT', text:`${user.name} has joined the conversation`})

       socket.join(user.room)

       io.to(user.room).emit('roomData', {room:user.room, users:getUserInRoom(user.room)})
    
       callback()
    })

    socket.on('sendMessage', (message, callback)=>{

        const user = getUser(socket.id)

        io.to(user.room).emit('message', {user:user.name, text:message, pic:user.image})
        io.to(user.room).emit('roomData', {room:user.room ,users:getUserInRoom(user.room)})

        callback()
    })


    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', {user:'🤖SlydeBOT',text:`${user.name} has left the chat`})
            socket.broadcast.to(user.room).emit('message',{user:'🤖SlydeBOT', text:`${user.name} has left the conversation`})
        }
    })

})







app.use(bodyParser.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


server.listen(config.port, () => {
    console.log(`Server has started on port ${config.port}`)
})