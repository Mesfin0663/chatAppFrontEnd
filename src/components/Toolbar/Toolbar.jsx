import React, { useContext, useEffect, useState } from 'react'
import { AccessAlarm, ThreeDRotation, Person, Search, Chat, Notifications } from '@mui/icons-material';
import './toolbar.css';
import { AuthContext } from '../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
function Toolbar(props) {
  const {user} = useContext(AuthContext)
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
console.log(windowSize);

    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">Chatapp</span>
          {/* <MenuIcon color='white'/>
          <CloseIcon color='white'/> */}

        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for chats"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem"> 
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
        <div className='user'>
<Link to ={`/profile/${user.username}`}>
<img src={user.profilePicture ? user.profilePicture:  "assets/defaultProfile.png"} alt="" className="conversationImg" />

</Link>
         
          {/* <span className="">{user.username}</span> */}
        </div>

        </div>
      </div>
    )
}

export default Toolbar