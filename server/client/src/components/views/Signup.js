import React,{useState,useEffect,useContext} from 'react'
import logo from './viewsStyles/imgs/slyde.png'
import './viewsStyles/Signup.scss'
import {FileImageOutlined,CheckCircleOutlined} from "@ant-design/icons";
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App';

const Signup = () => {

    const {state,dispatch} = useContext(UserContext)

    const clik = () =>{
    
        document.getElementById('file-input').click();
 }

    const history = useHistory()

    const [fullname,setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    const [banner,setBanner] = useState("")
    const [bannerUrl,setBannerUrl] = useState(undefined)

    useEffect(()=>{

        if(image){
            // console.log(image)
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
         }
    
     },[image])



    useEffect(()=>{
    if(url){
        uploadFields()
    }
},[url])

    const uploadPic = () =>{
        if(image){
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
         }
    }

    const uploadFields = () => {

        if((fullname === "") || (username === "")|| (email === "")|| (password === "")){
            return setError('* Please complete all fields before attempting to signup *')
        }
        // eslint-disable-next-line
        if((email != "") && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            document.getElementById('email').classList.add('error')
            setTimeout(function() {
                document.getElementById('email').classList.remove('error')
                setError("")
            }, 10000);
            return setError("* That email address is invalid. Please choose another one *")
        }
        // eslint-disable-next-line
        if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).test(password)){
            document.getElementById('password').classList.add('error')
            setTimeout(function() {
                document.getElementById('password').classList.remove('error')
                setError("")
            }, 10000);
            const errMsg = 'Please make sure your password meets the following requirements:\n1. Must be at least 8-15 characters long.\n2. Contains at least one letter, one number and one special character.'
            return setError(errMsg)
        }
        fetch("/signup", {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fullname,
                username,
                email,
                password,
                pic:url,
                banner:bannerUrl
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                history.push("/signin")
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const PostData = () => {
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
       
    }

    return(
        <>
        {!state?
        <div className="signupWrap">
            <div className="signupModal">

                <div className="modalTop">
                        <div className="logo">
                            <Link to="/">
                            <img src={logo} alt="logo" style={{'height':'80px', 'width':'80px'}} draggable="false" />
                            </Link>
                        </div>

                </div>

                <div className="signupTitle">Create your Account</div>
                        <span style={{color:"red", textAlign:"center"}}>{error}</span>
                <div className="inputContainer">

                        <div className="inputWrap">
                            <div className="placeholder">Name</div>
                            <input className="inputBox" type="text" value={fullname} onChange={(e)=>setFullName(e.target.value)} />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Username</div>
                            <input className="inputBox" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                        
                        <div className="inputWrap">
                            <div className="placeholder">Email</div>
                            <input className="inputBox" id="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Password</div>
                            <input className="inputBox" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="uploadProfilePic">
                            <div className="postboxAttachLink" id="upload" onClick={clik} type="file" value={image} onChange={(e)=>setImage(e.target.files[0])} style={{textAlign:'center',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'0.5em'}}>
                            
                                        {image?(url?<div className="profilePic" style={{backgroundImage:`url('${url}')`}}></div>:<FileImageOutlined style={{fontSize:'2em', color:'var(--black)',textAlign:'center'}} />):<FileImageOutlined style={{fontSize:'2em', color:'var(--black)',textAlign:'center'}} />}                          
                                        {image?<CheckCircleOutlined style={{fontSize:'2em', color:'#00FF00',marginTop:'0.5em'}} />:<span style={{color:'#ff4d52',fontWeight:500,marginTop:'1em'}}>No profile picture has been attached</span>}
                                        <input id="file-input"  type="file" style={{visibility:'hidden'}}/>
                                        
                                    </div>
                        </div>

                        <div className="button"><button onClick={()=>PostData()} >Sign up</button></div>

                </div>
                <div className="loginLink">Have an account? <Link to="/signin">Log in</Link></div>
            </div>
        </div>
        : history.push('/profile')}
        </>
    )
}

export default Signup