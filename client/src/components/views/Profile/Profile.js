import React from 'react'
import SideNav from './SideNav'
import ProfileCard from './ProfileCard'
import ProfileFeed from './ProfileFeed'
import Suggestions from './Suggestions'
import './profileStyles/Profile.scss'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return(
        <div className="profileContainer">
            <SideNav  props={user} />
            <div className="middle" >
                <ProfileCard props={user} />
                <ProfileFeed />
            </div>
            <Suggestions />
        </div>
    )
}

export default Profile