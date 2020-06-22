import React,{useState} from 'react'
import './viewsStyles/Login.scss'
import logo from './viewsStyles/imgs/slyde.png'
import { Link,useHistory } from 'react-router-dom'


const Login = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

   

    return(
        <div className="homeBody">
            <div className="loginForm">

                <div className="Logo">
                    <img src={logo} alt="logo" style={{'height':'120px', 'width':'120px'}} draggable="false" />
                </div>

                <div className="loginTitle">Login to Slyde</div>


                    <div className="inputWrap">
                        <input className="inputBox" name="email" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <div className="placeholder">Email or username</div>
                    </div>

                    <div className="inputWrap">
                        <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                        <div className="placeholder">Password</div>
                    </div>

                    <div className="button"><button>Log in</button></div>

                    <div className="loginFooter">
                        <div className="footLinks">
                        <Link to="/">Forgot password?</Link>
                        </div>
                        <span> • </span>
                        <div className="footLinks">
                            <Link to="/signup">Sign up for Slyde</Link>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Login