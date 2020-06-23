import React,{useState,useEffect} from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import PostBox from './PostBox'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined} from "@ant-design/icons";
import './ExploreFeed.scss'
import './Explore.scss'



const Explore = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch("/allposts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            console.log(result.posts)
        })
    },[])
    return(
        <div className="exploreContainer" style={{display:'flex'}}>
          
            <SideNav />
                <div className="middle">
                    <PostBox />
                    {
                        data.map((item) => {
                            return(
                                <div className="explorefeedContainer postComponent">
                                <div className="feedCard">
                                     <div className="feedCard-Left">
                                         <div className="profilePicture" style={{backgroundImage: `url(${pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                                     </div>
                                     <div className="feedCard-Right">
                                         <div className="feedCard-header">
                                                 <div className="feedCard-info">
                                                         <div className="feedCardAuthor Name">{item.postedBy.fullname}</div>
                                                         <div className="feedCardAuthor Tag">@{item.postedBy.username}</div>
                                                 </div>
                                                 <div className="feedCard-arrow">
                                                         <DownOutlined />
                                                 </div>
                                         </div>
                                         <div className="feedCard-body">
                                                <div className="postTitle">{item.body}</div>
                                                {item.media && <img src={item.media} height="auto" width="85%" style={{borderRadius:"0.6em"}}/>}
                                         </div>
                                         <div className="feedCard-actions">
                                             <HeartOutlined />
                                             <MessageOutlined />
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            )
                        })
                    }
                </div>
        
            <Suggestions />
        </div>
    )
}

export default Explore