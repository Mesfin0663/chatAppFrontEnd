import React, { useContext } from 'react';
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
import { Link, NavLink } from 'react-router-dom';
import {
     AccountBox,
     Article,
     Group,
     Home,
     ModeNight,
     Person,
     Settings,
     Storefront,
     Videocam,
   } from "@mui/icons-material";
   import {
     Box,
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
     Switch,
   } from "@mui/material";
import { UserContext } from '../../contexts/UserContext';
function Sidebar() {
     const {userData,setMode,mode} = useContext(UserContext)

  return (
     <Box flex={1} p={2} sx={{ display: { xs:"none",sm: "none", md: "block" } ,flex:"2", height: "100vh"}}>
     <Box position="fixed">
     <List>
         <ListItem disablePadding>
         <Link to="/" style={{color:"inherit"}}>
         <ListItemButton component="a" href="#home">
            
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
            </Link>
         
         </ListItem>

         <ListItem disablePadding>
         <Link to="/chatpage" style={{color:"inherit"}}>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
             <ChatIcon />
             </ListItemIcon>
             <ListItemText primary="Chat" />
           </ListItemButton>
           </Link>
         </ListItem>

         <ListItem disablePadding>
         <Link to="/secure-chat" style={{color:"inherit"}}>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
             <ChatIcon />
             </ListItemIcon>
             <ListItemText primary="Secure Chat" />
           </ListItemButton>
           </Link>
         </ListItem>
         {/* <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <Article />
             </ListItemIcon>
             <ListItemText primary="Pages" />
           </ListItemButton>
         </ListItem> */}
                  <Link to="/videochat" style={{color:"inherit"}}>

         <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
             <Videocam/>
             </ListItemIcon>
             <ListItemText primary="Videochat" />
           </ListItemButton>
         </ListItem>
         </Link>
         <Link to="/friends" style={{color:"inherit"}}>

         <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <Person />
             </ListItemIcon>
             <ListItemText primary="Friends" />
           </ListItemButton>
         </ListItem>
        </Link>

        <Link to={`/profile/${userData?.username}`} style={{color:"inherit"}}>

         <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <AccountBox />
             </ListItemIcon>
             <ListItemText primary="Profile" />
           </ListItemButton>
         </ListItem>
        </Link>

         <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <ModeNight />
             </ListItemIcon>
             <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
           </ListItemButton>
         </ListItem>

         
         {/* <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <Settings />
             </ListItemIcon>
             <ListItemText primary="Settings" />
           </ListItemButton>
         </ListItem> */}
       </List>
     </Box>
   </Box>
  )
}

export default Sidebar