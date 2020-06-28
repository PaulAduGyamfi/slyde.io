import React,{ useContext } from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import { UserContext } from '../../../App'
import './Chat.scss'


const Chat = () =>{



    const {state,dispatch} = useContext(UserContext)

    return(
        <>
            {state ?
                <div className="chatContainer">
                <SideNav />
                <div className="middle">
                    CHAT ROOMS COMING SOON !!!!!
                </div>
                <Suggestions />
            </div>
             : null}
    </>
    )
}

export default Chat