import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import './Splash.scss'
import Dots from '../viewsStyles/imgs/dots.png'
import logo from '../viewsStyles/imgs/slyde.png'
import { UserContext } from '../../../App'

const Splash = () => {
    const {state,dispatch} = useContext(UserContext)
    return(
       <div className="splashWrapper">
           <div className="sectionOne">
               <div className="sectionOneOverlay">
                    <div className="navBar">
                    <Link to="/">
                    <img
            src={logo}
            alt="logo"
            style={{ height: "60px", width: "60px"}}
            draggable="false"
          />
                    </Link>
                   
    {state?<Link to="/profile" style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'1em'}}>{state.fullname}</span><div className="profilePicture" style={{backgroundImage:`url('${state.pic}')`, backgroundPosition: "50% 50%", backgroundSize: "cover", height:'50px',width:'50px', borderRadius:'50%', marginRight:'4em'}}></div></Link>:<div className="logInOrSignUp"><div className="Login link"><Link to="/signin">Log in</Link></div><div className="Signup link"><Link to="/signup">Sign up</Link></div></div>}
                    </div>
               </div>
               <div className="sectionOneTitle">Slyde.io</div>
           </div>
           <div className="sectionTwo">
               <div className="sectionTwoOverlay"></div>
               <div className="sectionTwoTitle"><h2>The power of friendship maintained through distance</h2></div>
               <div className="sectionTwoBody"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
                <div className="sectionTwoLink"><Link to="/signin">Connect with friends on Slyde</Link></div>
           </div>
       </div>
    )
}


export default Splash