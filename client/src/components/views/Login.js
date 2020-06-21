import React from 'react'
import './viewsStyles/Login.scss'
import logo from './viewsStyles/imgs/slyde.png'


const Login = () => {
    return(
        <div className="homeBody">
            <div className="loginForm">

                <div className="Logo">
                    <img src={logo} alt="logo" style={{'height':'120px', 'width':'120px'}} draggable="false" />
                </div>

                <div className="loginTitle">Login to Slyde</div>


                    <div className="inputWrap">
                        <div className="placeholder">Email or username</div>
                        <input className="inputBox" type="text" />
                    </div>

                    <div className="inputWrap">
                        <div className="placeholder">Password</div>
                        <input className="inputBox" type="password" />
                    </div>

                    <div className="button"><button>Log in</button></div>

                    <div className="loginFooter">
                        <div className="footLinks">
                            <a href="/">Forgot password?</a>
                        </div>
                        <span> • </span>
                        <div className="footLinks">
                            <a href="/signup">Sign up for Slyde</a>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Login