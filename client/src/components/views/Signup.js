import React from 'react'
import logo from './viewsStyles/imgs/slyde.png'
import './viewsStyles/Signup.scss'
import { Link } from 'react-router-dom'

const Signup = () => {
    return(
        <div className="signupWrap">
            <div className="signupModal">

                <div className="modalTop">
                        <div className="logo"><img src={logo} alt="logo" style={{'height':'80px', 'width':'80px'}} draggable="false" /></div>

                </div>

                <div className="signupTitle">Create your Account</div>

                <div className="inputContainer">

                        <div className="inputWrap">
                            <div className="placeholder">Name</div>
                            <input className="inputBox" type="text" />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Username</div>
                            <input className="inputBox" type="text" />
                        </div>
                        
                        <div className="inputWrap">
                            <div className="placeholder">Email</div>
                            <input className="inputBox" type="text" />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Password</div>
                            <input className="inputBox" type="password" />
                        </div>

                        <div className="button"><button>Sign up</button></div>

                </div>
                <div className="loginLink">Have an account? <Link to="/">Log in</Link></div>
            </div>
        </div>
    )
}

export default Signup