import React from 'react'
import './profileStyles/ProfileCard.scss'

const ProfileCard = () => {
    return(
        <div className="profilecardWrap"> 
            <div className="profileBanner">
                    BANNER
            </div>
            <div className="profileInfo">
                <div className="profileInfoWrap">
                    <div className="profileInfoTop">
                        <div className="profilePicture"></div>
                        <div className="editProfileButton"><button>Edit profile</button></div>
                    </div>
                    <div className="profileInfoBottom">
                            <div className="profileUsername">Kingjames</div>
                            <div className="profileStats">
                                <div className="profileFollowers"><span id="followers">1.2M</span> Followers</div>
                                <div className="profileFolling"><span id="following">100</span> Following</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileCard