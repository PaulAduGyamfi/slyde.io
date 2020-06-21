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
                        <div className="trendingTitle">Title</div>
                        <div className="trendingTitle"><DownOutlined /></div>
                    </div>
                    
                    <div className="trendingMore"></div>
                    
                </div>
                <div className=""></div>
            </div>
            
        </div>
    )
}
export default Suggestions