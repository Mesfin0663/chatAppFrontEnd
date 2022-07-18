import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router ,
    Outlet,
    useNavigate,
    Routes,
    Route,
    Link,
    useLocation
    // Redirect
  } from "react-router-dom";

import ChatUi from './ChatUi/ChatUi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './messengerUi.css'
import Conversation from './Conversation/Conversation';
function MessengerUi() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [title,setTitle]= useState("")
    const [screen,setScreen]= useState("")

    const location = useLocation();

    useEffect(()=>{
       if(location.pathname=="/chatui/online-friends"){
        setTitle("Onlien")
       }else if(location.pathname == "/chatui"){
        setTitle("Conversations")
       }else {
        setTitle("Chat")
       }

    },[location])
 
    //let { path, url } = useRouteMatch();
    let navigate = useNavigate();
    return (
        <div >
          
            <div className='navbar'>
                    <MenuIcon fontSize="large" onClick={showSidebar} className="Hamburger-menu"/>
                    <div>{title}</div>
                <div className="currentUser">
        <img src="/public/assets/default Profile.png" alt="" className="conversationImg" />
          <span className="">user1</span>
        </div>
            </div>
            <div className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <p className="navbar-toggle">
                 
                            <CloseIcon fontSize="large" onClick={showSidebar} />
                    
                    </p>
                    <li className='nav-text'>
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </li>
                   
                    <li className='nav-text'>
                        <Link to="">
                            <span>Conversations</span>
                        </Link>
                    </li>
                    <li className='nav-text'>
                        <Link to="/chatui/online-friends">
                            <span>Online</span>
                        </Link>
                    </li>
                    <li className='nav-text'>
                        <Link to="/chatui/search">
                            <span>Search</span>
                        </Link>
                    </li>
                </ul>
            </div>
    
  <Outlet/>
            <>
   
            
            </>
            
        </div>
    )
}

export default MessengerUi