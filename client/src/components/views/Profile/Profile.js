import React,{useEffect,useState,useContext} from 'react'
import SideNav from './SideNav'
import Suggestions from './Suggestions'
import './profileStyles/Profile.scss'
import './profileStyles/ProfileFeed.scss'
import pic from "../viewsStyles/imgs/lbj.jpg";
import {DownOutlined,HeartOutlined,MessageOutlined,HeartFilled,DeleteOutlined} from "@ant-design/icons";
import { UserContext } from '../../../App'
import './profileStyles/ProfileCard.scss'
import ReactEmoji from 'react-emoji'
import banner from "../viewsStyles/imgs/banner.jpg"



const Profile = () => {

    const clik = () =>{
    
        document.getElementById('file-input').click();
 }
    
    const [posts,setMyposts] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [banner,setBanner] = useState("")
    // const [bannerUrl,setBannerUrl] = useState("")
    // console.log(state)

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
    const deletePost = (postid) =>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            const newData = posts.filter(item => {
                return item._id !== result._id
            })
            setMyposts(newData)
        }).catch(err =>{
            console.log(err)
        })
}


    useEffect(()=>{
        if(banner){

            const data = new FormData()
            data.append("file",banner)
            data.append("upload_preset","slydepreset")
            data.append("cloud_name", "slyde")
       
            
            fetch("https://api.cloudinary.com/v1_1/slyde/image/upload", {
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                // setBannerUrl(data.url)
                // console.log(data)
                
                fetch('/updatebanner',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        banner:data.url
                    })
                }).then(res => res.json())
                .then(result => {
                    localStorage.setItem("user",JSON.stringify({...state,banner:result.banner}))
                    dispatch({type:"UPDATEBANNER",payload:result.banner})
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[banner])

    const updateBanner = (file) =>{
        
            setBanner(file)


    }



    return(
        <>
        {state?
        <div className="profileContainer">
            <SideNav />
            <div className="middle" >
            <div className="profilecardWrap"> 
            <div className="profileBanner" style={{backgroundImage: `url(${state?state.banner:""})`, backgroundPosition: "50% 20%", backgroundSize: "cover",cursor:'pointer'}} onClick={clik} type="file" value={banner} onChange={(e)=>updateBanner(e.target.files[0])} ><input id="file-input"  type="file" style={{visibility:'hidden'}}/></div>
            <div className="profileInfo">
                <div className="profileInfoWrap">
                    <div className="profileInfoTop">
                        <div className="profilePicture" style={{backgroundImage: `url(${state?state.pic:""})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                        <div className="editProfileButton"><button>Edit profile</button></div>
                    </div>
                    <div className="profileInfoBottom">
                            <div className="profileUsername">
                                <div className="userFullname">{state?state.fullname:"loading"}</div>
                                <svg viewBox="0 0 24 24" aria-label="Verified account" className="badge"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                            </div>
                            <div className="userTagname">@{state?state.username:"loading"}</div>
                            <div className="profileStats">
                                <div className="profileFollowers"><span id="followers">{state?state.followers.length:"0"}</span> Followers</div>
                                <div className="profileFolling"><span id="following">{state?state.following.length:"0"}</span> Following</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
                <div style={{display:"flex",flexDirection:"column-reverse",width:'100%'}}>
                        {
                            posts.map(item => {
                                return(
                                    <div className="profilefeedContainer postComponent" key={item._id}>
             <div className="feedCard">
                                     <div className="feedCard-Left">
                                         <div className="profilePicture" style={{backgroundImage: `url(${item.postedBy.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                                     </div>
                                     <div className="feedCard-Right">
                                         <div className="feedCard-header">
                                                 <div className="feedCard-info">
                                                         <div className="feedCardAuthor Name">{item.postedBy.fullname}</div>
                                                         <div className="feedCardAuthor Tag">@{item.postedBy.username}</div>
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
                                                {item.media.substring(item.media.length-4,item.media.length.length)==".mp4" ? <video width="85%" height="auto" controls style={{outline:"none",borderRadius:"0.6em"}} muted><source src={item.media} type="video/mp4" /></video>:<img src={item.media} height="auto" width="85%" style={{borderRadius:"0.6em"}}/>}
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
                                                    <div className="posterPic" style={{backgroundImage: `url(${record.postedBy.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover",height:"30px",width:"30px",borderRadius:50}}></div>
                                                    <div className="authorReply">
                                                        <div className="top"><span>{record.postedBy.fullname}</span> @{record.postedBy.username}</div>
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
        :null}
        </>
    )
}

export default Profile