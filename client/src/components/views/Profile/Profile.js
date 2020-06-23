import React,{useEffect,useState,useContext} from 'react'
import SideNav from './SideNav'
import ProfileCard from './ProfileCard'
import ProfileFeed from './ProfileFeed'
import Suggestions from './Suggestions'
import './profileStyles/Profile.scss'
import './profileStyles/ProfileFeed.scss'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined} from "@ant-design/icons";


const Profile = () => {

    
    const [posts,setMyposts] = useState([])
   

    useEffect(()=>{
        fetch("/myposts",{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res => res.json())
        .then(result=>{
          setMyposts(result.mypost)
        })
      },[])

    return(
        <div className="profileContainer">
            <SideNav />
            <div className="middle" >
                <ProfileCard />
                        {
                            posts.map(item => {
                                return(
                                    <div className="profilefeedContainer postComponent" key={item._id}>
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

export default Profile