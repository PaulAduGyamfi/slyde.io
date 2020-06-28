import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Message.scss'

const Message = ({message:{user,text},name}) => {
    let sentByCurrentUser = false

    const trimmedName = user.trim().toLowerCase()

    if(user === trimmedName){
        sentByCurrentUser = true
    }

    return(
        sentByCurrentUser ? (
            <div className="messageBubbleContainer right">
                <p className="sentBy">{trimmedName}</p>
                <div className="messageBubble">
                    <div className="messageText">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        ): (
            <div className="messageBubbleContainer left">
            <div className="messageBubble">
                <div className="messageText">
                    <p>{text}</p>
                </div>
            </div>
            <p className="sentBy">{user}</p>
        </div>
        )
    )
}

export default Message