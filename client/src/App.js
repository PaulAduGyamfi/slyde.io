import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/views/Login'
import Signup from './components/views/Signup'
import Profile from './components/views/Profile/Profile'

function App() {
  return (
   <BrowserRouter>
      <Route exact path="/">
          <Login />
      </Route>
      <Route exact path="/signup">
          <Signup />
      </Route>
      <Route exact path="/profile">
          <Profile />
      </Route>
    
   </BrowserRouter>
  );
}

export default App;
