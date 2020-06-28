import React,{ useContext, useState, useEffect } from 'react'
import SideNav from '../../Profile/SideNav'
import Suggestions from '../../Profile/Suggestions'
import queryString from 'query-string'
import io, { Socket } from 'socket.io-client'
import './Chat.scss'


let socket;

const Chat = () =>{

    const [room,setRoom] = useState("")
    const [name,setName] = useState("")
    const ENDPOINT = 'localhost:3000'
    
    useEffect(() => {
        const {name,room} = queryString.parse(window.location.search)

        socket = io(ENDPOINT)
       
        setRoom(room)
        setName(name)

        socket.emit('join', {name,room})
      
    },[ENDPOINT, window.location.search])
    
    return(
            <div className="chatRoomContainer">
                <SideNav />
                <div className="middle">
                   CHAT
                </div>
                <Suggestions />
            </div>

    )
}

export default Chat