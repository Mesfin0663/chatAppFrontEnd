import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import { UserContext } from '../../contexts/UserContext'
import './videoChat.css'
import OnlinePeople from './OnlinePeople'
import { toast } from 'react-toastify'

import {Drawer,Box,Typography , IconButton, Alert} from "@mui/material"
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
   import {FaSignInAlt} from 'react-icons/fa'

function VedioChat() {
    const {  
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        startVideo,
        onlineUsers,
        setUserToCall
        
      } = useContext(SocketContext)
      const {userData:user} = useContext(UserContext)
      const [onlineFriends, setOnlineFriends] = useState([])
      const [isDrawerOpen, setIsDrawerOpen] = useState(false)
      const {userData,setMode,mode} = useContext(UserContext)
      useEffect(()=>{
        startVideo()
         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
    
          myVideo.current.srcObject = currentStream;
        });
      },[])
      useEffect(()=>{
        if(user){setName(user.username)}
      },[user])
        useEffect(()=>{
         

          
          // setOnlineFriends(user?.followings.filter((f)=> onlineUsers.some((u) => u.userId == f)))
setOnlineFriends(onlineUsers?.filter((u)=> user?.followings.some((f)=>f ===u.userId)))
        },[onlineUsers])
   
        // useEffect(()=>{
        //  if( call.isReceivingCall && !callAccepted ){
        //   toast.success("Friend calling Go to the botton and Answar the call")

        //  }

        // },[call])
  return (
    <Box className='gridContainer' sx={{ display: { xs: "grid", sm: "grid" ,md:"flex"} }}>
       <Box sx={{ display: { xs: "block", sm: "block" ,md:"none"} }}> 
     <IconButton size="large"  aria-label='logo' onClick={()=>setIsDrawerOpen(true)}>
       <FaSignInAlt/> Online Friends
     </IconButton>
      <Drawer anchor="left" open ={isDrawerOpen} onClose={()=> setIsDrawerOpen(false)}>
    
      <Box className='online'>
        <h1>Online Friends</h1>
        {
          onlineFriends.length!=0 ?
   onlineFriends?.map(o =>(
    <div key={o.userId} onClick={()=>{

      callUser(o.socketId)
      }} >
      <OnlinePeople onlineUser={o} />
    </div>
)):
<Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


     <Typography variant="body2" color="text.secondary">
     <Alert severity="info"> No Onlinne Friend</Alert>
   
     HaHu Chat👻
     </Typography>
   
   </Box>
        }
     
       </Box>
    </Drawer>
    </Box>
       <Box sx={{ display: { xs: "none", sm: "block" } }} className='online'>
        <h1>Online Friends</h1>
        {
          onlineFriends.length!=0 ?
   onlineFriends?.map(o =>(
    <div key={o.userId} onClick={()=>{

      callUser(o.socketId)
      }} >
      <OnlinePeople onlineUser={o} />
    </div>
)):
<Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


     <Typography variant="body2" color="text.secondary">
     <Alert severity="info"> No Onlinne Friend yet, Your online friends will be listed here so you can call them</Alert>
   
     HaHu Chat👻
     </Typography>
   
   </Box>
        }
     
       </Box>
        {
            stream && (
                <div className='paper'>
                <h5>{name || 'Name'}</h5>
                   <video playsInline autoPlay muted loop ref={myVideo}  className='video'/>
            </div>
            ) 
         
            
        }

      {
        callAccepted && !callEnded &&(
            <div className='paper'>
            <h5>{call.name || 'Name'}</h5>
   
                   <video playsInline  ref={userVideo} autoPlay className='video'/>
            </div>
        )
      }
      
    </Box>
  )
}

export default VedioChat