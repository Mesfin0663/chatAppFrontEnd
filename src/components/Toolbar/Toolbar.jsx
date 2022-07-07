import React, { useContext } from 'react'
import { AccessAlarm, ThreeDRotation, Person, Search, Chat, Notifications } from '@mui/icons-material';
import './toolbar.css';
import { AuthContext } from '../../context/AuthContext';
function Toolbar(props) {
  const {user} = useContext(AuthContext)
    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">Chatapp</span>
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
          {/* <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div> */}
          {/* <div className="topbarIcons">
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
          </div> */}
        <div className='user'>
        <img src={user.profilePicture ? user.profilePicture:  "/public/assets/default Profile.png"} alt="" className="conversationImg" />
          <span className="">{user.username}</span>
        </div>

        </div>
      </div>
    )
}

export default Toolbar