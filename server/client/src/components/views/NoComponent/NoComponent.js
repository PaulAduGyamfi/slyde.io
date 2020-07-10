import React from 'react'
import logo from '../viewsStyles/imgs/slyde.png'
import { Link } from 'react-router-dom'
import '../viewsStyles/_global.scss'

const NoComponent = () => {
    return(
        <div className="errorWrap" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'2em'}}>
            <div className="text"><h1 style={{fontFamily:'"SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif', fontSize:'5em',fontWeight:'700',color:'var(--primary)'}}>Sorry, that page doesn’t exist!</h1></div>
           <Link to="/"><div className="logo"><img src={logo} height="500px" width="500px" /></div></Link> 
            <div>Why not navigate to the <Link to="/explore"><span style={{color:'var(--primary)',fontWeight:'600',fontSize:'1.1em'}}>Explore</span></Link> page to find something else?</div>
        </div>
    )
}

export default NoComponent