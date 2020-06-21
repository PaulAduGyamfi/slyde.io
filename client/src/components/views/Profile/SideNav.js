import React from 'react'
import './profileStyles/SideNav.scss'
import logo from '../viewsStyles/imgs/slyde.png'
import { HomeOutlined,ReadOutlined,UserOutlined } from '@ant-design/icons'

const SideNav = () => {
    return(
        <div className="navContainer">
            
           <div className="navContainerWrapper">
                <div className="sidenavLogo">
                    <img src={logo} alt="logo" style={{'height':'60px', 'width':'60px'}} draggable="false" />
                </div>
                <div className="sidenavHome">
                    <HomeOutlined style={{'fontSize':'29px'}}/>
                    <div className="home Text">Home</div>
                </div>
                <div className="sidenavNews">
                    <ReadOutlined style={{'fontSize':'29px'}}/>
                    <div className="news Text">News</div>
                </div>
                <div className="sidenavUser">
                    <UserOutlined style={{'fontSize':'29px'}}/>
                    <div className="user Text">Profile</div>
                </div>
                <div className="sidnavPost">
                    <button>Post</button>
                </div>
           </div>
        </div>
    )
}
export default SideNav