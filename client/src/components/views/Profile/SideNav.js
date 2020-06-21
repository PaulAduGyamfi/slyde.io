import React from "react";
import "./profileStyles/SideNav.scss";
import logo from "../viewsStyles/imgs/slyde.png";
import pic from "../viewsStyles/imgs/lbj.jpg";
import {
  HomeOutlined,
  ReadOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "spectre.css";
import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <div className="navContainer">
      <div className="navContainerWrapper">
        <div className="sidenavLogo">
          <img
            src={logo}
            alt="logo"
            style={{ height: "60px", width: "60px" }}
            draggable="false"
          />
        </div>
        <div className="sidenavHome">
        <Link to="/explore">
            <HomeOutlined style={{ fontSize: "29px" }} />
            <div className="home Text">Home</div>
          </Link>
        </div>
        <div className="sidenavNews">
        <Link to="/">
            <ReadOutlined style={{ fontSize: "29px" }} />
            <div className="news Text">News</div>
          </Link>
        </div>
        <div className="sidenavUser">
        <Link to="/profile">
            <UserOutlined style={{ fontSize: "29px" }} />
            <div className="user Text">Profile</div>
          </Link>
        </div>
        <div className="sidnavPost">
          <button>Post</button>
        </div>

        <div className="popover popover-top">
          <div className="profileButton">
            <div className="profileSnippetWrap">
              <div
                className="profilePic"
                style={{
                  backgroundImage: `url(${pic})`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="pofileUserName">Lebron James</div>
            </div>

            <div className="logoutModalButton">
              <DownOutlined />
            </div>
          </div>
          <div class="popover-container" style={{ width: "20em" }}>
            <div class="card">
              <div class="card-header">
                <div className="profileSnippetWrap">
                  <div
                    className="profilePic"
                    style={{
                      backgroundImage: `url(${pic})`,
                      backgroundPosition: "50% 50%",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="pofileUserName">Lebron James</div>
                </div>
              </div>
              <div class="card-body logout">Log out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideNav;
