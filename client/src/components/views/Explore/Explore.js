import React,{useState,useEffect,useContext} from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import PostBox from './PostBox'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined,HeartFilled} from "@ant-design/icons";
import './ExploreFeed.scss'
import './Explore.scss'
import 'animate.css'
import { UserContext } from '../../../App';



const Explore = () => {

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("/allposts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            console.log(result)
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
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)

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
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        <div className="exploreContainer" style={{display:'flex'}}>
          
            <SideNav />
                <div className="middle">
                    <PostBox />
                    <div style={{display:"flex",flexDirection:"column-reverse"}}>
                    {
                        data.map((item) => {
                            return(
                                <div className="explorefeedContainer postComponent" key={item._id}>
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
                                                {console.log(item.media)}
                                                {item.media.substring(item.media.length-4,item.media.length.length)==".mp4" ? <video width="85%" height="auto" controls style={{outline:"none",borderRadius:"0.6em",backgroundColor:"black", maxHeight:"40em"}} muted><source src={item.media} type="video/mp4" style={{backgroundColor:"black"}}/></video>:<img src={item.media} height="auto" width="85%" style={{borderRadius:"0.6em"}}/>}
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
                                
                                             <span style={item.likes.includes(state._id)?{marginLeft:"0.75em",color:"#e0245e"}:{marginLeft:"0.75em",color:"#f0f0f079"}}>{item.likes.length>0&&item.likes.length}</span>
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

export default Explore