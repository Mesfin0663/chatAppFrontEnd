import { useContext, useState } from 'react'
import {
  BrowserRouter ,
  Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './pages/Home/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Signup from './pages/Signup/Signup1';

import Signin from './pages/Signin/Signin';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/Messenger/Messenger';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter forceRefresh={true}>
    
    <div className="App">
    
      
        <Switch>
          {/* <Route exact path ="/">
              {
                user? <Home/> : <Signin/>
              }
          </Route> */}
       
          <Route exact path ="/">
              {
                user? <Messenger/> : <Signin/>
              }
          </Route>
          <Route exact path ="/messenger">
              {
                user? <Messenger/> : <Signin/>
              }
          </Route>
          <Route exact path ="/signin">
              {
                user? <Redirect to ='/' /> : <Signin/>
              }
          </Route>
          <Route exact path ="/signup">
              {
                user? <Redirect to ='/' /> : <Signup/>
              }
          </Route> 
        </Switch>
 
    
    </div>
    </BrowserRouter>
  )
}

export default App
