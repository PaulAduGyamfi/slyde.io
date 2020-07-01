import React,{useState,useEffect,useContext} from 'react'
import './PostBox.scss'
import {FileImageOutlined,FileGifOutlined,SmileOutlined,ReloadOutlined,LoadingOutlined,CloseCircleFilled} from "@ant-design/icons";
import pic from "../viewsStyles/imgs/lbj.jpg"
import { UserContext } from '../../../App';
import { Upload } from 'antd';

// import {useHistory} from 'react-router-dom'

 const PostBox = (props) =>{

    // const history = useHistory()

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

 const {state,dispatch} = useContext(UserContext)

 const [body,setBody] = useState("")
 const [image,setImage] = useState("")
 const [url,setUrl] = useState("")
 const [error,setError] = useState("")
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

 useEffect(()=>{

    if(image){
        console.log(image)
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

    return(
        <div className="postboxContainer">
            <div className="postboxWrap">

                <div className="postboxHeader">
                        <div className="postboxTitle">{props.prop}</div>
                    <div className="postboxRefresh" onClick={()=>window.location.reload()}><ReloadOutlined /></div>
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
        </div>
    )
}

export default PostBox