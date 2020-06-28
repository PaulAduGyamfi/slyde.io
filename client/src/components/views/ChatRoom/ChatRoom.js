import React,{ useContext, useState, useEffect } from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import { UserContext } from '../../../App'
import { Link } from 'react-router-dom'
import './ChatRoom.scss'


const ChatRoom = () =>{
    
    
    const {state,dispatch} = useContext(UserContext)

    console.log(state)
    
    const [room,setRoom] = useState("")
    const [name,setName] = useState("")
    const [image,setImage] = useState("")

    
    return(
        <>
            {state ?
                <div className="chatRoomContainer">
                <SideNav />
                <div className="middle">
                    <div className="joinContainer">
                        <div className="joinHeader"></div>
                        <div className="joinBody">
                            <input placeholder="Join a room" type="text" onChange={(e)=> {
                                setRoom(e.target.value)
                                setName(state.username)
                                setImage(state.pic)
                            }}/>
                            <Link onClick={ e => (!room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&image=${image}`}><button className="joinButton" type="submit">JOIN</button></Link>

                        </div>
                    </div>
                </div>
                <Suggestions />
            </div>
             : null}
    </>
    )
}

export default ChatRoom