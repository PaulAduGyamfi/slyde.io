import React from 'react'

const Signup = () => {
    return(
        <div className="signupWrap">
            <div className="signupModal">

                <div className="modalTop">
                        <div></div>
                        <div className="logo"></div>
                        <div className="button"></div>
                </div>

                <div className="signupTitle"></div>

                <div className="inputContainer">

                        <div className="inputWrap">
                            <div className="placeholder">First name</div>
                            <input className="inputBox" type="text" />
                        </div>

                        <div className="inputWrap">
                            <div className="placeholder">Last</div>
                            <input className="inputBox" type="text" />
                        </div>

                </div>
            </div>
        </div>
    )
}

export default Signup