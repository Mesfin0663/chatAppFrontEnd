import { useContext, useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router ,
  
  Routes,
  Route,
  Link,
  // Redirect
} from "react-router-dom";

import Home from './pages/Home/Home';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Signup from './pages/Signup/Signup1';

import Signin from './pages/Signin/Signin';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/Messenger/Messenger';
import MessengerUi from './ui/pagesUi/MessengerUi/MessengerUi';
import ChatUi from './ui/pagesUi/MessengerUi/ChatUi/ChatUi';
import NotFound from './pages/NotFound/NotFound';
import Conversation from './ui/pagesUi/MessengerUi/Conversation/Conversation';
import OnlineFriendsUi from './ui/pagesUi/MessengerUi/OnlineFriendsUi/OnlineFriendsUi';
import Messenger2 from './pages/Messenger2/Messenger2';
import {default as M2Conversation} from './pages/Messenger2/Conversations/Conversations';
import M2Chat from './pages/Messenger2/M2Chat/M2chat';
import { io } from 'socket.io-client';
import Messenger3 from './pages/Messenger2/Messenger3';
import Profile from './pages/profile/Profile';
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

function App() {
  const {user} = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef(); // used to scroll to the most recent message by default
  //Fetching all conversation of a user 
//   useEffect(()=>{
//     if(user){
//       socket.current = io("ws://localhost:8900");

//       socket.current.emit("addUser", user._id);
//       socket.current.on("getUsers", users=>{
//           setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId == f)))
//            console.log("from socket io",users)
//         })
//     }
   
// },[user])  

const [windowSize, setWindowSize] = useState(getWindowSize());
useEffect(() => {
 function handleWindowResize() {
   setWindowSize(getWindowSize());
 }

 window.addEventListener('resize', handleWindowResize);

 return () => {
   window.removeEventListener('resize', handleWindowResize);
 };
}, []);

  return (
    
    <div className="App">
    
      
        <Routes>
        
          <Route path="/" element={user?<Home/>:<Signin/>} />
          <Route path="/signin" element={user?<Home/>:<Signin/>} />
          <Route path="/signup" element={user?<Home/>:<Signup/>} />
          <Route path="/messenger" element={user?<Messenger/>:<Signin/>} /> 
          <Route path="/messenger2/*" element={
            windowSize.innerWidth>800?user?<Messenger/>:<Signin/>:
            user?<Messenger2/>:<Signin/>} 
            
            /> 
          <Route path ="/profile/:username" element={<Profile/>}/>

         {/* <Route path="" element={<M2Conversation  socket={socket}/>}/> */}
              {/* <Route path=":id" element={<M2Chat />} />  */}


      
  
              <Route path="online-friends" element={<OnlineFriendsUi/>} />

          <Route path="/chatui/" element={user?<MessengerUi/>:<Signin/>} > 

                <Route path="" element={<Conversation/>} />
                


              
                <Route path="conversation/" element={<ChatUi/>} /> 

                <Route path="online-friends" element={<OnlineFriendsUi />} />
          </Route> 
          <Route path="/messenger3/*" element={user?<Messenger3/>:<Signin/>} /> 

          <Route path="*" element={<NotFound/>} > </Route> 

          {/* <Route exact path ="/">
              {
                user? <Home/> : <Signin/>
              }
          </Route> */}
{/*        
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
          <Route exact path ="/ui" component={MessengerUi}/>
             */}
        </Routes>
 
    
    </div>
   
  )
}

export default App
