import React,{useState,useEffect,useContext} from 'react'
import './PostBox.scss'
import {FileImageOutlined,FileGifOutlined,SmileOutlined,SearchOutlined,LoadingOutlined,CloseCircleFilled} from "@ant-design/icons";
import pic from "../viewsStyles/imgs/lbj.jpg"
import { UserContext } from '../../../App';
import { Upload } from 'antd';
import { Link } from 'react-router-dom'

// import {useHistory} from 'react-router-dom'

 const PostBox = (props) =>{

    const {state,dispatch} = useContext(UserContext)

    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [error,setError] = useState("")
    const [search,setSearch] = useState("")
    const [userDetails,setUserDetails] = useState([])

/*----------------------- Search Modal -------------------- */

      const openModal = () =>{
        document.getElementById("modal-id").classList.add("active")
    }
    const closeModal = ()=>{
        
        document.getElementById("modal-id").classList.remove("active")

    }
 /*----------------------- Search Modal -------------------- */


 /*----------------------- Post Box -------------------- */

    var autoExpand = function (field) {

        // Reset field height
        field.style.height = 'inherit';
    
        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);
    
        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                     + field.scrollHeight
                     + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                     + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    
        field.style.height = height + 'px';
    
    };
    
    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
    }, false);

 const clik = () =>{
    
        document.getElementById('file-input').click();
 }
/*----------------------- Post Box -------------------- */

 useEffect(()=>{

    if(image){
        // console.log(image)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","slydepreset")
        data.append("cloud_name", "slyde")
    
        
        fetch("https://api.cloudinary.com/v1_1/slyde/upload", {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
     }

 },[image])

 

 const postDetails = () => {
     if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","slydepreset")
        data.append("cloud_name", "slyde")
   
        
        fetch("https://api.cloudinary.com/v1_1/slyde/upload", {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })


        if(url){
                    fetch("/createpost",{
                        method:"post",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            body,
                            pic:url
                        })
                    }).then(res=>res.json())
                       .then(data=>{
                        //    console.log(data)
                           if(data.error){
                               setError(data.error)
                           }
                           else{
                            setTimeout(() => {
                                document.getElementById('postbox').value=''
                                setImage("")
                                setUrl("")
                                window.location.reload()
                               }, 900)
                               
                           }
                       }).catch(err=>{
                           console.log(err)
                       })
                }
     }
     else{
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res=>res.json())
           .then(data=>{
            //    console.log(data)
               if(data.error){
                   setError(data.error)
               }
               else{
                   setTimeout(() => {
                    document.getElementById('postbox').value=''
                    setBody("")
                    window.location.reload() 
                   }, 900)
               }
           }).catch(err=>{
               console.log(err)
           })
     }
     

 }


 const fetchSearch = (query) =>{
     setSearch(query)
     fetch('/search',{
         method:"post",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             query
         })
     }).then(res => res.json())
     .then(result => {
         setUserDetails(result.user)
     })

 }

    return(
        <div className="postboxContainer">
            <div className="postboxWrap">

                <div className="postboxHeader">
                        <div className="postboxTitle">{props.prop}</div>
                    <div className="postboxRefresh" onClick={()=>openModal()}><SearchOutlined /></div>
                </div>

                <div className="postboxBody">

                    <div className="postboxBody-Top">
                       
                        <div className="profilePicture" style={{backgroundImage: `url(${state?state.pic:""})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                        <div className="postboxTextBox">
                            <textarea id="postbox" maxLength="280" placeholder="What's the word?" value={body} onChange={(e)=>setBody(e.target.value)}>

                            </textarea>
                            {image?(url?<div className="imagePreview" style={{height:'17.5em',width:'31.5em',backgroundColor:'var(--dark-background-match)',backgroundImage:`url('${url}')`}}><span onClick={()=>{setImage("");setUrl("")}}><CloseCircleFilled /></span></div>:<LoadingOutlined style={{color:'var(--primary',display:'flex',alignItems:'center',justifyContent:'ceter', width:'100%'}}/>):''}
                           {/* {url? :''} */}
                        </div>

                    </div>
                    
                    <div className="postboxBody-Bottom">

                        <div className="postboxAttach">
                            <div className="postboxAttachLink" id="upload" onClick={clik} type="file" value={image} onChange={(e)=>setImage(e.target.files[0])}>
                                    
                                    <input id="file-input"  type="file"/>
                                    <FileImageOutlined />
                                </div>
                            <div className="postboxAttachLink"><FileGifOutlined /></div>
                            <div className="postboxAttachLink"><SmileOutlined /></div>
                           
                        </div>
                                    <span style={{color:'red', fontWeight:400}}>{error}</span>

                        <div className="postboxSubmit"><button id="postButton" onClick={()=>postDetails()}>Post</button></div>

                    </div>
                </div>
            </div>


              {/* ------------------------- Search Modal ------------------ */}
            <div className="modal " id="modal-id">
                <a href="#close" className="modal-overlay" aria-label="Close" onClick={()=>{closeModal();setSearch("")}} style={{opacity:".5"}}></a>
                <div className="modal-container" style={{backgroundColor:'var(--dark-background)',height:"30em",maxHeight:"auto",borderRadius:"1em"}}>
                        <div className="modal-header" >
                            <input 
                            type="text"
                            placeholder="Search Slyde"
                            value={search}
                            onChange={(e)=>fetchSearch(e.target.value)}
                            />
                            
                            <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={()=>{closeModal();setSearch("")}} style={{color:"#ff4d52"}}></a>
                        </div>
                        <div className="modal-body">
                            <div className="content">
                            <div className="searchResults">
                                {
                                    userDetails.map((item,i) => {
                                        return(
                                    <Link to={item._id !== state._id ? `/profile/${item._id}`: `/profile`} key={i}>
                                        <div className="searchResult">
                                            <div className="searchResultWrap">
                                                <div className="profilePicture" style={{backgroundImage: `url(${item.pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                                                <div className="searchResultInfo">
                                                    <div className="name fullname">{item.fullname}</div>
                                                    <div className="name username">@{item.username}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        {/* <div className="commentButton"><button>Reply</button></div> */}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PostBox
















//  useEffect(()=>{
   
//     if(url){
//         fetch("/createpost",{
//             method:"post",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 body,
//                 pic:url
//             })
//         }).then(res=>res.json())
//            .then(data=>{
//             //    console.log(data)
//                if(data.error){
//                    setError(data.error)
//                }
//                else{
//                 setTimeout(() => {
//                     document.getElementById('postbox').value=''
//                     window.location.reload()
//                    }, 900)
                   
//                }
//            }).catch(err=>{
//                console.log(err)
//            })
//     }
//  },[url])