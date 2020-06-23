import React,{useEffect,useState,useContext} from 'react'
import SideNav from './SideNav'
import ProfileCard from './ProfileCard'
import ProfileFeed from './ProfileFeed'
import Suggestions from './Suggestions'
import './profileStyles/Profile.scss'
import './profileStyles/ProfileFeed.scss'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined,HeartFilled} from "@ant-design/icons";
import { UserContext } from '../../../App'


const Profile = () => {

    
    const [posts,setMyposts] = useState([])
    const {state,dispatch} = useContext(UserContext)

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


      const likePost = (id) => {
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":'application/json',
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = posts.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setMyposts(newData)

        }).catch(err => {
            console.log(err)
        })
    }


    const unlikePost = (id) => {
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":'application/json',
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            const newData = posts.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setMyposts(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="profileContainer">
            <SideNav />
            <div className="middle" >
                <ProfileCard />
                <div style={{display:"flex",flexDirection:"column-reverse"}}>
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
                                                {item.media.substring(item.media.length-4,item.media.length.length)==".mp4" ? <video width="85%" height="auto" controls><source src={item.media} type="video/mp4" /></video>:<img src={item.media} height="auto" width="85%" style={{borderRadius:"0.6em"}}/>}
                                         </div>
                                         <div className="feedCard-actions">
                                             <div>
                                             {item.likes.includes(state._id)?<HeartFilled className="animate__animated animate__bounceIn" style={{color:"#e0245e",cursor:"pointer"}} onClick={() =>{
                                                 if(item.likes.includes(state._id)){
                                                        unlikePost(item._id)
                                                 }else{
                                                    likePost(item._id)
                                                 }
                                             }} />:<HeartOutlined className="likeButton" style={{color:"#f0f0f079",cursor:"pointer"}} onClick={() =>{
                                                 if(item.likes.includes(state._id)){
                                                        unlikePost(item._id)
                                                 }else{
                                                    likePost(item._id)
                                                 }
                                             }}/>  }
                                
                                             <span style={item.likes.includes(state._id)?{marginLeft:"0.75em",color:"#e0245e"}:{marginLeft:"0.75em",color:"#f0f0f079"}}>{item.likes.length}</span>
                                             </div>
                                             <MessageOutlined />
                                         </div>
                                     </div>
                                 </div>
        </div>
                                )
                            })
                        }
                        </div>
            </div>
            <Suggestions />
        </div>
    )
}

export default Profile