import React,{useState} from 'react'
import logo from './viewsStyles/imgs/slyde.png'
import './viewsStyles/Signup.scss'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {

    const history = useHistory()

    const [fullname,setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const PostData = () => {
        if((fullname === "") || (username === "")|| (email === "")|| (password === "")){
            return setError('* Please complete all fields before attempting to signup *')
        }
        // eslint-disable-next-line
        if((email != "") && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return setError("* That email address is invalid. Please choose another one *")
        }
        // eslint-disable-next-line
        if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)){
            
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
                password
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                history.push("/login")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="signupWrap">
            <div className="signupModal">

                <div className="modalTop">
                        <div className="logo"><img src={logo} alt="logo" style={{'height':'80px', 'width':'80px'}} draggable="false" /></div>

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
                            <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Password</div>
                            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="button"><button onClick={()=>PostData()} >Sign up</button></div>

                </div>
                <div className="loginLink">Have an account? <Link to="/">Log in</Link></div>
            </div>
        </div>
    )
}

export default Signup