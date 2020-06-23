import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Login from './components/views/Login'
import Signup from './components/views/Signup'
import Profile from './components/views/Profile/Profile'
import Explore from './components/views/Explore/Explore'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
 
        }else{
            history.push('/signin')
        }
    },[])
    return(
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/signin">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/explore">
                <Explore />
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
