import React,{ useContext, useState, useEffect } from 'react'
import SideNav from '../../Profile/SideNav'
import Suggestions from '../../Profile/Suggestions'
import queryString from 'query-string'
import io, { Socket } from 'socket.io-client'
import Messages from '../Messages/Messages'
import './Chat.scss'


let socket;

const Chat = () =>{

    const [room,setRoom] = useState("")
    const [name,setName] = useState("")
    const [message,setMessage] = useState([])
    const [messages,setMessages] = useState([])
    const ENDPOINT = 'localhost:3000'
    
    useEffect(() => {
        const {name,room} = queryString.parse(window.location.search)

        socket = io(ENDPOINT)
       
        setRoom(room)
        setName(name)

        socket.emit('join', {name,room}, ()=>{

        })

        return ()=>{
            socket.emit('disconnect')

            socket.off()
        }
      
    },[ENDPOINT, window.location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,message])
        })
    },[messages])

    const sendMessage = (e) => {

        // e.preventDefault()

        if(message){
            socket.emit('sendMessage', message, ()=>{
                setMessage('')
            })
        }
    }

    console.log(message,messages)
    
    return(
            <div className="chatContainer">
                <SideNav />
                <div className="middle">
                   <div className="messageContainer">
                       
                       <Messages messages={messages} />
                       
                       <div className="messageBox">
                           <input value={message} onChange={e=>setMessage(e.target.value)} onKeyPress={e=>e.key === 'Enter'?sendMessage():null} />
                       </div>
                   </div>
                </div>
                <Suggestions />
            </div>

    )
}

export default Chat