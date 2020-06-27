import React from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import './News.scss'

const News = () =>{
    return(

        <div className="newsContainer">
            <SideNav />
            <div className="middle">
                NEWS COMING SOON !!!!!!!
            </div>
            <Suggestions />
        </div>
    )
}

export default News