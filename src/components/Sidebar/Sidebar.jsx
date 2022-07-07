import React from 'react';
import './sidebar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarlistItem">
               <RssFeedIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarlistItem">
               <ChatIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarlistItem">
               <PlayCircleFilledWhiteIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarlistItem">
               <GroupsIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarlistItem">
               <BookmarkIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarlistItem">
               <HelpOutlineIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarlistItem">
               <WorkOutlineIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarlistItem">
               <EventIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarlistItem">
               <SchoolIcon className="sidebarIcon"/>
               <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">
          Show More
        </button>
        <hr />
        <ul className="sidebarFriendList">
          
        </ul>
      </div>

    </div>
  )
}

export default Sidebar