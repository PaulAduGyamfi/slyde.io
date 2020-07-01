import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Splash from './components/views/Splash/Splash'
import Login from './components/views/Login'
import Signup from './components/views/Signup'
import Profile from './components/views/Profile/Profile'
import Explore from './components/views/Explore/Explore'
import FollowingFeed from './components/views/Explore/FollowingFeed'
import UserProfile from './components/views/Profile/UserProfile'
import ChatRoom from './components/views/ChatRoom/ChatRoom'
import Chat from './components/views/ChatRoom/Chat/Chat'
import News from './components/views/News/News'
import {reducer,initialState} from './reducers/userReducer'
import { message } from 'antd';


export const UserContext = createContext()

const Routing = () => {
    // document.documentElement.setAttribute('data-theme', 'light')

    document.documentElement.setAttribute('data-theme', localStorage.getItem("mode"))


    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
 
        }else{
            history.push('/')
           
        }
    },[])
    { document.getElementById("htmlTitle").innerHTML = state?state.fullname + ' (@'+ state.username+') / Slyde':"Slyde"}
    return(
        <Switch>
            <Route exact path="/">
                <Splash />
            </Route>
            <Route exact path="/signin">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route path="/explore">
                <Explore />
            </Route>
            <Route path="/feed">
                <FollowingFeed />
            </Route>
            <Route path="/profile/:userid">
                <UserProfile />
            </Route>
            <Route path="/news">
                <News />
            </Route>
            <Route path="/chatroom">
                <ChatRoom />
            </Route>
            <Route path="/chat">
                <Chat />
            </Route>
        </Switch>
    )
}

function App() {

    const [state,dispatch] = useReducer(reducer,initialState)

  return (
        <UserContext.Provider value={{state,dispatch}}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
  
  );
}

export default App;
