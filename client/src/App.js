import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/views/Login'
import Signup from './components/views/Signup'

function App() {
  return (
   <BrowserRouter>
      <Route exact path="/">
          <Login />
      </Route>
      <Route exact path="/signup">
          <Signup />
      </Route>
   </BrowserRouter>
  );
}

export default App;
