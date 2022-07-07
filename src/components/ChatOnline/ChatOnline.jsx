import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from '../../axios';
import './ChatOnline.css'
function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);  
  useEffect(()=>{
      const getFriends = async () =>{
       
        try{
          const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
        console.log(res.data);
       }catch(err){
           console.log(err)
       }
      }
      getFriends();
  },[currentId])

  useEffect(()=>{
    setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)))

  },[friends, onlineUsers])
console.log(onlineUsers)
  return (
    <div className="chatOnline">
      {
        onlineFriends.map((o)=>(
          <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
          <img src={o?.profilePicture? o.profilePicture:"/assets/person/1.jpeg"} alt="" className="chatOnlineImg" />
          <div className="chatOnlineBadge"></div>

          </div>
          <div className="chatOnlineName">{o.username}</div>

      </div>
        ))
      }
      
    </div>
  )
}

export default ChatOnline