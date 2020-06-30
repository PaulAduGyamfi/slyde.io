import React from 'react'
import { Link } from 'react-router-dom'
import './Splash.scss'
import Dots from '../viewsStyles/imgs/dots.png'

const Splash = () => {
    return(
       <div className="splashWrapper">
           <div className="sectionOne">
               <div className="sectionOneOverlay"><Link to="/signin">Log in</Link></div>
               <div className="sectionOneTitle">Slyde.io</div>
           </div>
           <div className="sectionTwo">
               <div className="sectionTwoOverlay"></div>
               <div className="sectionTwoTitle"><h2>The power of frienship maintained through distance</h2></div>
               <div className="sectionTwoBody"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
           </div>
       </div>
    )
}


export default Splash