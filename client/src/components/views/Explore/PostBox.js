import React,{useState} from 'react'
import './PostBox.scss'
import {FileImageOutlined,FileGifOutlined,SmileOutlined,ReloadOutlined} from "@ant-design/icons";
import pic from "../viewsStyles/imgs/lbj.jpg"
import {useHistory} from 'react-router-dom'

const PostBox = () =>{

    const history = useHistory()

    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [error,setError] = useState("")

    const postDetails = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","slydepreset")
        data.append("cloud_name", "slyde")

        fetch("https://api.cloudinary.com/v1_1/slyde/image/upload", {
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

        fetch("/createpost", {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                body,
                url
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
               
                history.push("/explore")
             
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }




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

    return(
        <div className="postboxContainer">
            <div className="postboxWrap">

                <div className="postboxHeader">
                    <div className="postboxTitle">What's New</div>
                    <div className="postboxRefresh"><ReloadOutlined /></div>
                </div>

                <div className="postboxBody">

                    <div className="postboxBody-Top">
                       
                        <div className="profilePicture" style={{backgroundImage: `url(${pic})`, backgroundPosition: "50% 50%", backgroundSize: "cover"}}></div>
                        <div className="postboxTextBox">
                            <textarea maxLength="280" placeholder="What's the word?" value={body} onChange={(e)=>setBody(e.target.value)}>

                            </textarea>
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
                                    <span>{error}</span>

                        <div className="postboxSubmit"><button onClick={()=>postDetails()}>Post</button></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostBox