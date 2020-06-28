import React,{useContext} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Message.scss'
import ReactEmoji from 'react-emoji'
import { UserContext } from '../../../../App'

const Message = ({message:{user,text, pic},name}) => {
    
    const {state,dispatch} = useContext(UserContext)


    let sentByCurrentUser = false

    const trimmedName = user.trim().toLowerCase()

    if(user === trimmedName){
        sentByCurrentUser = true
    }

    return(

        
        sentByCurrentUser && trimmedName === state.username.trim().toLowerCase() ? (
            <div className="messageBubbleContainer right">
                <p className="sentBy">{trimmedName}</p>
                <div className="messageBubble">
                    <div className="messageText">
                        <p>{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
                <div className="profilePicture" style={{backgroundImage:`url('${state.pic}')`, backgroundPosition: "50% 50%", backgroundSize: "cover", height:'25px',width:'25px', borderRadius:'50%',marginLeft:'1em'}}></div>
            </div>
        ): (!sentByCurrentUser && user === 'SlydeBOT'?(
            <div className="botMessage center">
            <div className="botName">{user}</div>
            <div className="botText">{ReactEmoji.emojify(text)}</div>
        </div>
        ):(
            <div className="messageBubbleContainer left">
                <div className="profilePicture" style={{backgroundImage:`url('${pic}')`, backgroundPosition: "50% 50%", backgroundSize: "cover", height:'25px',width:'25px', borderRadius:'50%', marginRight:'1em'}}></div>
            <div className="messageBubble">
                <div className="messageText">
                    <p>{text}</p>
                </div>
            </div>
            <p className="sentBy">{user}</p>
        </div>
        ) )



        
        
    )
}

export default Message




/*




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



*/