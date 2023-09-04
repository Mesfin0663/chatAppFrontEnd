import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from '../../axios';
import './ChatOnline.css'
import { useSelector } from 'react-redux';
import { Alert, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
function ChatOnline({onlineUsers, currentId}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);  
  const {user:authUser} = useSelector((state)=> state.auth)
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  useEffect(()=>{
      const getFriends = async () =>{
        const config ={
          headers:{
              Authorization: `Bearer ${authUser.token}`
          }
      }
        try{
          const res = await axios.get("/api/users/friends/" + authUser._id, config);
        setFriends(res.data);
   
       }catch(err){
           console.log(err)
       }
      }
      getFriends();
  },[currentId])

  useEffect(()=>{
  
    setOnlineFriends(friends?.filter((f)=> onlineUsers?.includes(f._id)))

  },[friends, onlineUsers])

  return (
    <div className="chatOnline">
      <h1>Online Friends</h1>
      {
        onlineFriends.length !=0?
        onlineFriends.map((o)=>(
          <div key={o.username}className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
          <img src={o?.profilePicture? o.profilePicture: PF + "person/noAvatar.png"} alt="" className="chatOnlineImg" />
          <div className="chatOnlineBadge"></div>

          </div>
          <div className="chatOnlineName">
          <Typography gutterBottom variant="h5" component="div">
          <Link to={`/profile/${o.username}`}>
          <span style={{color:"#0d6efd"}}>{o.username}</span>
            </Link>
          </Typography>
            </div>

      </div>
        )):
        <Box sx={{display:"grid" , alignItems: 'center', justifyContent:"center"}}>
     


        <Typography variant="body2" color="text.secondary">
        <Alert severity="info"> No Onlinne Friend</Alert>
      
        ሃሁ Chat👻
        </Typography>
      
      </Box>
      }
      
    </div>
  )
}

export default ChatOnline