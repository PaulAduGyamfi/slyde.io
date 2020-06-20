import React from 'react'
import './viewsStyles/Login.scss'

const Login = () => {
    return(
        <div className="homeBody">
            <div className="loginForm">

                <div className="Logo">S</div>

                <div className="loginTitle">Login to Slyde</div>

                    <div className="inputBox">
                        <soan>email</soan>
                        <input type="text" />
                    </div>

                    <div className="inputBox">
                        <soan>email</soan>
                        <input type="text" />
                    </div>
                    <div className="loginFooter">
                        <div className="footLinks">
                            <a href="#">Forgot password?</a>
                        </div>
                        <span> • </span>
                        <div className="footLinks">
                            <a href="#">Sign up for Slyde</a>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Login