import React,{ useContext } from 'react'
import SideNav from '../Profile/SideNav'
import Suggestions from '../Profile/Suggestions'
import { UserContext } from '../../../App'
import './News.scss'

const News = () =>{


    const {state,dispatch} = useContext(UserContext)
    return(
    <>
    {state ? 
        <div className="newsContainer">
            <SideNav />
            <div className="middle">
                NEWS COMING SOON !!!!!!!
            </div>
            <Suggestions />
        </div>
        : null}
    </>
    )
}

export default News