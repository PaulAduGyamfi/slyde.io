import React from 'react'
import POST from '../../viewsStyles/imgs/POST.gif'
import CHAT from '../../viewsStyles/imgs/CHAT.gif'

const Features = () => {
    return(
        <>
        <div className="featuresContainer">
                   <div className="featuresWrap">
                       <div className="featuresImage" style={{backgroundImage:`url('${POST}')`}}></div>
                       <div className="featuresDescription">
                           <div className="title"><h1>Post, Like & Comment</h1></div>
                           <div className="body"><p>Create an Account today and start creating posts, following others, and even leave a like and or comment under any post.</p></div>
                       </div>
                   </div>
               </div>



               <div className="featuresContainer">
                   <div className="featuresWrap">
                       <div className="featuresImage" style={{backgroundImage:`url('${CHAT}')`}}></div>
                       <div className="featuresDescription">
                           <div className="title"><h1>Real Time Messaging</h1></div>
                           <div className="body"><p>Enter a topic or group name and instantly hop into group chats with others that want to talk about the same topic.</p></div>
                       </div>
                   </div>
               </div>
        </>
    )
}

export default Features