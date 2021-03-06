import React,{useState,useEffect,useContext} from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import PostBox from './PostBox'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined,HeartFilled,DeleteOutlined} from "@ant-design/icons";
import './ExploreFeed.scss'
import './Explore.scss'
import 'animate.css'
import "spectre.css"
import { UserContext } from '../../../App'
import { Link } from 'react-router-dom'
import ReactEmoji from 'react-emoji'
import moment from 'moment'



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
            // console.log(result)
        })

    },[data])


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

    const makeComment = (text,postId) =>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                postId,
                text
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

    const deletePost = (postid) =>{
            fetch(`/deletepost/${postid}`,{
                method:"delete",
                headers:{
                    Authorization:"Bearer "+localStorage.getItem('jwt')
                }
            }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            }).catch(err =>{
                console.log(err)
            })
    }




    return(
        <>
        {state?
        <div className="exploreContainer" style={{display:'flex'}}>
          
            <SideNav />
                <div className="middle">
                    <PostBox prop={"What's New"} />

                        
                    <div style={{display:"flex",flexDirection:"column",width:'100%'}}>
                    {
                        data.map((item) => {
                            return(
                                <div className="explorefeedContainer postComponent" key={item._id}>
                                    {/* {console.log(item)} */}
                                <div className="feedCard">
                                     <div className="feedCard-Left">
                                     <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}`: `/profile`}>
                                         <div className="profilePicture" style={{backgroundImage: `url(${item.postedBy.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                                         </Link>
                                     </div>
                                     <div className="feedCard-Right">
                                         <div className="feedCard-header">
                                                 <div className="feedCard-info">
                                                         <div className="feedCardAuthor Name"><Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}`: `/profile`} >{item.postedBy.fullname}</Link></div>
                                                         <div className="feedCardAuthor Tag"><Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}`: `/profile`} >@{item.postedBy.username}</Link></div>
                                                         <div className="feedCardAuthor Tag"> • </div>
                                                         <div className="Tag">{moment(item.createdAt).startOf('minute').fromNow()}</div>
                                                    </div>
                                                        {item.postedBy._id == state._id
                                                            && <div className="feedCard-arrow popover popover-bottom">
                                                            <DownOutlined />
                                                                <div className="popover-container" style={{width:'8em'}}>
                                                                    <div className="card">
                                                                        <div className="card-body" style={{textAlign:'center'}} onClick={()=>deletePost(item._id)}>
                                                                            <DeleteOutlined /> Delete
                                                                        </div>
                                                            
                                                                    </div>
                                                                </div>
                                                        </div>
                                                        }
                                         </div>
                                         <div className="feedCard-body">
                                                <div className="postTitle">{ReactEmoji.emojify(item.body)}</div>
                                                {/* {console.log(item.media)} */}
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
                                             }} />:<HeartOutlined className="likeButton" style={{color:"#b0b9c3",cursor:"pointer"}} onClick={() =>{
                                                 if(item.likes.includes(state._id)){
                                                        unlikePost(item._id)
                                                 }else{
                                                    likePost(item._id)
                                                 }
                                             }}/>  }
                                
                                             <span style={item.likes.includes(state._id)?{marginLeft:"0.75em",color:"#e0245e"}:{marginLeft:"0.75em",color:"#b0b9c3"}}>{item.likes.length>0&&item.likes.length}</span>
                                             </div>
                                             <div className="commentButton"><MessageOutlined onClick={()=>{
                                                 document.getElementById(`${item._id}`).classList.toggle("showComments")
                                             }}/><span className="commentCount">{item.comments.length>0&&item.comments.length}</span></div>
                                         </div>
                                     </div>
                                 </div>

                            <div className="comments" id={`${item._id}`}>
                                <div className="commentsWrap">
                                    {
                                        item.comments.map((record,index) => {
                                            return(
                                                <div className="comment" style={{color:'#ffffff'}} key={index}>
                                                    <Link to={record.postedBy._id !== state._id ? `/profile/${record.postedBy._id}`: `/profile`} >
                                                    <div className="posterPic" style={{backgroundImage: `url(${record.postedBy.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover",height:"30px",width:"30px",borderRadius:50}}></div>
                                                    </Link>
                                                    <div className="authorReply">
                                                    <Link to={record.postedBy._id !== state._id ? `/profile/${record.postedBy._id}`: `/profile`} >
                                                        <div className="top" style={{color:'var(--trsansparent-grey)'}}><span style={{color:'var(--primary)'}}>{record.postedBy.fullname}</span> @{record.postedBy.username}</div>
                                                        </Link>
                                                        <div className="bottom">{ReactEmoji.emojify(record.text)}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                 
                                 <form id={`${item._id}`} onSubmit={(e)=>{
                                     e.preventDefault()
                                     makeComment(e.target[0].value,item._id)
                                     e.target[0].value = ''
                                 }}>
                                     <textarea placeholder="Comment your reply" />
                                     <button>Reply</button>
                                </form>
                            </div>
                        </div>
                            )
                        })
                    }
                    </div>
                </div>
        
            <Suggestions />
        </div>
        : null}
        </>
    )
}

export default Explore




/*






<div className="modal " id="modal-id">
                <a href="#close" className="modal-overlay" aria-label="Close" onClick={()=>closeModal()} style={{opacity:".5"}}></a>
                <div className="modal-container" style={{backgroundColor:"#2C2F33",height:"30em",maxHeight:"auto",borderRadius:"1em"}}>
                        <div className="modal-header" style={{borderBottom:"1px solid #f0f0f079"}}>
                            <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={()=>closeModal()} style={{color:"#ff4d52"}}></a>
                        </div>
                        <div className="modal-body">
                            <div className="content">
                                    
                                    <div className="searchWrap" style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                            
                                            <div className="searchTop">
                                                    <div className="posterPic" style={{backgroundImage: `url(${pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover",height:"52px",width:"52px",borderRadius:50}}></div>
                                                    <div className="posterInfoWrap">
                                                            <div className="posterInfo">
                                                                <div className="feedCardAuthor Name">Lebron James</div>
                                                                <div className="feedCardAuthor Tag">@kingjames</div>
                                                            </div>
                                                            <div className="postBody">
                                                                Don’t go anywhere near him @KingJames  he’s one of those anti vaccine new age water boys
                                                            </div>
                                                    </div>
                                            </div>
                                            
                                            <div className="commentDivide">
                                                    <div className="verticalLine"></div>
                                                    <div className="replyTo">Replying to <span>@ZlatanLeko</span></div>
                                            </div>

                                            <div className="commentBottom">
                                                    <div className="posterPic" style={{backgroundImage: `url(${pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover",height:"52px",width:"52px",borderRadius:50}}></div>
                                                    <textarea placeholder="Comment your reply" rows="5"></textarea>
                                            </div>
                                            
                                    </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <div className="commentButton"><button>Reply</button></div>
                        </div>
                </div>
            </div>














*/