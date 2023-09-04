import React, { useState,useContext}   from 'react'
import {Drawer,Box,Typography , IconButton} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import ChatIcon from '@mui/icons-material/Chat';

import { Link } from 'react-router-dom';
import {
     AccountBox,

     Home,
     ModeNight,
     Person,
     Settings,
     Storefront,
     Videocam
   } from "@mui/icons-material";
   import {
  
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
     Switch,
   } from "@mui/material";
import { UserContext } from '../../contexts/UserContext';
function LeftDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const {userData,setMode,mode} = useContext(UserContext)
  return (
    <Box sx={{ display: { sm: "block", md: "none" } }}> 
     <IconButton size="large"  aria-label='logo' onClick={()=>setIsDrawerOpen(true)}>
        <MenuIcon sx={{color:"white"}}/>
     </IconButton>
      <Drawer anchor="left" open ={isDrawerOpen} onClose={()=> setIsDrawerOpen(false)}>
    
      <Box >
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

{/*          
         <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
             <ListItemIcon>
               <Settings />
             </ListItemIcon>
             <ListItemText primary="Settings" />
           </ListItemButton>
         </ListItem> */}
       </List>
     </Box>
    </Drawer>
    </Box>
  
  )
}

export default LeftDrawer