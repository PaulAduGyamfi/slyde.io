import React from 'react'
import SideNav from './SideNav'
import ProfileCard from './ProfileCard'
import ProfileFeed from './ProfileFeed'
import Suggestions from './Suggestions'
import './profileStyles/Profile.scss'

const Profile = () => {
    return(
        <div className="profileContainer">
            <SideNav />
            <div className="middle" >
                <ProfileCard />
                <ProfileFeed />
            </div>
            <Suggestions />
        </div>
    )
}

export default Profile