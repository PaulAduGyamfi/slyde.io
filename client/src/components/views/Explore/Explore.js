import React from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import PostBox from './PostBox'
import ExploreFeed from './ExploreFeed'
import './Explore.scss'


const Explore = () => {
    return(
        <div className="exploreContainer" style={{display:'flex'}}>
          
            <SideNav />
                <div className="middle">
                    <PostBox />
                    <ExploreFeed />
                </div>
        
            <Suggestions />
        </div>
    )
}

export default Explore