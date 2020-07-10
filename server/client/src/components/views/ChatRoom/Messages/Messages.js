import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
import './Messages.scss'

const Messages = ({messages,name, image}) => {



    return(
        <>
            {
                messages.map((message,index) => <div key={index}><Message message={message} name={name} image={image} /></div>)
            }
        </>
    )
}

export default Messages