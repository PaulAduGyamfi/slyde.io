import React,{useContext, useEffect} from "react";
import "./profileStyles/SideNav.scss";
import logo from "../viewsStyles/imgs/slyde.png";
import pic from "../viewsStyles/imgs/lbj.jpg";
import {
  HomeOutlined,
  ReadOutlined,
  UserOutlined,
  DownOutlined,
  WechatOutlined,
  RocketOutlined
} from "@ant-design/icons";
import "spectre.css";
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from "../../../App";

const SideNav = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)


const lightMode = () => {
  document.documentElement.setAttribute('data-theme', 'light')
  localStorage.setItem('mode',"light")
}
const darkMode = () => {
  document.documentElement.setAttribute('data-theme', 'dark')
  localStorage.setItem('mode',"dark")
}




  return (
    <div className="navContainer">
      <div className="navContainerWrapper">
        <div className="sidenavLogo">
          <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{ height: "60px", width: "60px" }}
            draggable="false"
          />
          </Link>
         
        </div>
        <div className="sidenavHome">
        <Link to="/feed">
            <HomeOutlined style={{ fontSize: "29px" }} />
            <div className="home Text">Home</div>
          </Link>
        </div>
        <div className="sidenavExplore">
        <Link to="/explore">
            <RocketOutlined style={{ fontSize: "29px" }} />
            <div className="home Text">Explore</div>
          </Link>
        </div>
        <div className="sidenavNews">
        <Link to="/news">
            <ReadOutlined style={{ fontSize: "29px" }} />
            <div className="news Text">News</div>
          </Link>
        </div>
        <div className="sidenavChat">
        <Link to="/chatroom">
            <WechatOutlined style={{ fontSize: "29px" }} />
            <div className="news Text">Chat</div>
          </Link>
        </div>
        <div className="sidenavUser">
        <Link to="/profile">
            <UserOutlined style={{ fontSize: "29px" }} />
            <div className="user Text">Profile</div>
          </Link>
        </div>
        {/* <div className="sidnavPost">
          <button>Post</button>
        </div> */}

        <div className="popover popover-top">
          <div className="profileButton">
            <div className="profileSnippetWrap">
              <div
                className="profilePic"
                style={{
                  backgroundImage: `url(${state?state.pic:""})`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="nameWrap" style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                  <div className="pofileUserName fullname">{state?state.fullname:"loading"}</div>
                  <div className="pofileUserName username">@{state?state.username:"loading"}</div>
              </div>
              
            </div>

            <div className="logoutModalButton">
              <DownOutlined />
            </div>
          </div>
          <div className="popover-container" style={{ width: "20em" }}>
            <div className="card">
              <div className="card-header">
                <div className="profileSnippetWrap">
                  <div
                    className="profilePic"
                    style={{
                      backgroundImage: `url(${state?state.pic:""})`,
                      backgroundPosition: "50% 50%",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="pofileUserName" style={{width:"50%",textAlign:"center"}}>{state?state.fullname:"loading"}</div>
                </div>
              </div>
              <div className="colorMode">
                <div className="mode light" onClick={()=>lightMode()}>Light</div>
                <div className="mode dark" onClick={()=>darkMode()}> Dark</div>
              </div>
              <div className="card-body logout" onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push("/signin")
              }}>
                Log out
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideNav;
