import React,{useState,useContext} from 'react'
import './viewsStyles/Login.scss'
import logo from './viewsStyles/imgs/slyde.png'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import { notification} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';


const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("")

   const PostData = () => {


        fetch("/signin", {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email:username,
                password
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{

                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})

                notification.config({
                    placement: 'topRight',
                    top: 50,
                    duration: 3.5,
                    rtl: true,
                    
                  });
                
                  
                    history.push("/explore", notification.open({
                        message: `Hello @${data.user.username}`,
                        style: {
                            width: 250,
                            maxWidth: "auto",
                            marginLeft: 335 - 600,
                            textAlign: 'center',
                            colorAdjust: '#ff4d52',
                            fontWeight:'700',
                            fontSize: '1.3em'
                          },
                      }))
                
                  
                
             
            }
        })
        .catch(err=>{
            console.log(err)
        })
   }

    return(
        <>
        {state?history.push('/profile'):
        <div className="homeBody">
            <div className="loginForm">

                <div className="Logo">
                    <img src={logo} alt="logo" style={{'height':'120px', 'width':'120px'}} draggable="false" />
                </div>

                <div className="loginTitle">Login to Slyde</div>

                <span style={{color:"red", textAlign:"center"}}>{error}</span>
                    <div className="inputWrap">
                        <input className="inputBox" name="email" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <div className="placeholder">Email or username</div>
                    </div>

                    <div className="inputWrap">
                        <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                        <div className="placeholder">Password</div>
                    </div>

                    <div className="button"><button id="login" onClick={()=>PostData()} >{state?<LoadingOutlined />:"Log in"}</button></div>

                    <div className="loginFooter">
                        <div className="footLinks">
                        <Link to="/signin">Forgot password?</Link>
                        </div>
                        <span> • </span>
                        <div className="footLinks">
                            <Link to="/signup">Sign up for Slyde</Link>
                        </div>
                    </div>

            </div>
        </div>
}
        </>
    )
}

export default Login