import React from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import './Chat.scss'

const Chat = () =>{
    return(
        <div className="chatContainer">
        <SideNav />
        <div className="middle">
            CHAT ROOMS COMING SOON !!!!!
        </div>
        <Suggestions />
    </div>
    )
}

export default Chat