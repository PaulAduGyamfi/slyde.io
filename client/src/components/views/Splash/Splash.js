import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Features from './Features/Features'
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
                        <img src={logo} alt="logo" style={{ height: "60px", width: "60px"}} draggable="false" />
                        </Link>
                   
                        {state?<Link to="/profile" style={{display:'flex', alignItems:'center'}}><span style={{marginRight:'1em'}}>{state.fullname}</span><div className="profilePicture" style={{backgroundImage:`url('${state.pic}')`, backgroundPosition: "50% 50%", backgroundSize: "cover", height:'50px',width:'50px', borderRadius:'50%', marginRight:'4em'}}></div></Link>:<div className="logInOrSignUp"><div className="Login link"><Link to="/signin">Log in</Link></div><div>|</div><div className="Signup link"><Link to="/signup">Sign up</Link></div></div>}
                    </div>
                    <div className="sectionTwo">
                        <div className="sectionTwoOverlay"></div>
                        <div className="sectionTwoTitle"><h1><span>Slyde</span> where the power of friendship is maintained through distance.</h1></div>
                        <div className="sectionTwoBody"><p>Don't let social distancing, distance you from current relationships. <span><Link to="/signin">Join Slyde</Link></span> and see what your friends are up to, and make new friends!</p></div>
                        {/* <Link to="/signin">Connect with friends on Slyde</Link> */}
                    </div>
                    <div className="parallaxParagraph">
                        <div className="parallaxParagraphWrapper">
                            <div className="parallaxParagraphWrapperBody">
                                <p>Anyone is welcome.</p>
                                <p>Great vibes is a must.</p>
                                <p>Our goal is to not only bring friends together, but for us all, to be one.</p>
                                <p>#OneLoveOneHeart</p>
                            </div>
                        </div>
                    </div>
               </div>
               
               <Features />
               
           </div>
           
          
       </div>
    )
}


export default Splash