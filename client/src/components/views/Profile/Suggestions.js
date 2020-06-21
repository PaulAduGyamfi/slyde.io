import React from 'react'
import './profileStyles/Suggestions.scss'
import {SearchOutlined,DownOutlined} from "@ant-design/icons";

const Suggestions = () => {
    return(
        <div className="suggestionsContainer">

             <div className="searchContainer">
                    <input className="searchBox" type="text" name="search" placeholder="Search Slyde" />
                    <div className="searchIcon">
                        <SearchOutlined />
                    </div>
                </div>

            <div className="suggestionsWrap">
               
                <div className="Trending">
                    
                    <div className="trendingHeader">Whats Happening</div>

                    <div className="trendingItem">
                        <div className="trendingTitle">COVID-19: Updates for the US</div>
                        <div className="trendingArrow"><DownOutlined /></div>
                    </div>
                    <div className="trendingItem">
                        <div className="trendingTitle">Trump’s Tulsa Rally Adds to Week of Warning Signs for Campaign</div>
                        <div className="trendingArrow"><DownOutlined /></div>
                    </div>
                    <div className="trendingItem">
                        <div className="trendingTitle">Mark Cuban: NBA may let fans push noise into the arena</div>
                        <div className="trendingArrow"><DownOutlined /></div>
                    </div>
                    <div className="trendingItem">
                        <div className="trendingTitle">Apple could switch to its own chips for Macs. Here's what that means</div>
                        <div className="trendingArrow"><DownOutlined /></div>
                    </div>
                    
                    
                    <div className="trendingMore">See more</div>
                    
                </div>
                <div className=""></div>
            </div>
            
        </div>
    )
}
export default Suggestions