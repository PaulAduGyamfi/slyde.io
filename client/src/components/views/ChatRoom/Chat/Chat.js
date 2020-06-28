import React,{ useContext, useState, useEffect } from 'react'
import SideNav from '../../Profile/SideNav'
import Suggestions from '../../Profile/Suggestions'
import queryString from 'query-string'
import io, { Socket } from 'socket.io-client'
import Messages from '../Messages/Messages'
import './Chat.scss'
import { UserContext } from '../../../../App'


let socket;

const Chat = () =>{

    const {state,dispatch} = useContext(UserContext)

    const [room,setRoom] = useState("")
    const [name,setName] = useState("")
    const [image,setImage] = useState("")
    const [message,setMessage] = useState([])
    const [messages,setMessages] = useState([])
    const ENDPOINT = 'localhost:3000'
    
    useEffect(() => {
        const {name,room,image} = queryString.parse(window.location.search)

        socket = io(ENDPOINT)
       
        setRoom(room)
        setName(name)
        setImage(image)
        

        socket.emit('join', {name,room,image}, ()=>{

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
                updateScroll()
                setMessage('')
            })
        }
    }

    //Scroll to bottom
   
    let scrolled = false;
    function updateScroll(){
        if(!scrolled){
            var element = document.getElementById("data");
            element.scrollTop = element.scrollHeight;
        }
    }
  

    // console.log(name,messages)
    
    return(
        <>
        {state?
            <div className="chatContainer">
                <SideNav />
                <div className="middle">
                        <div className="messageContainer" id="data">
                            
                              <div  style={{height:'45em', position:'relative'}}> 
                                   <Messages messages={messages} image={image} />
                                   </div>
                                
                                <div className="messageBox">
                                    <input placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} onKeyPress={e=>e.key === 'Enter'?sendMessage():null} />
                                    <div className="sendMessageButton"><button type="submit" onClick={()=>sendMessage()}>Send</button></div>
                                </div>
                        </div>
                </div>
                <Suggestions />
            </div>
                :null}
            </>

    )
}

export default Chat