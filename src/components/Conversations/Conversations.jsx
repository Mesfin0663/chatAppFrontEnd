import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import './conversation.css'
function Conversations({conversation, currentUser}) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m !== currentUser._id);

    const getUser = async ()=>{
      try{
        const res = await axios("/api/users/getuser/?userId="+ friendId);

        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser();
  }, [ currentUser, conversation])
  return (
    <div className="conversation">
        <img src={user.profilePicture ? user.profilePicture:  PF + "person/noAvatar.png"} alt="" className="conversationImg" />
        <span className="conversationName">{user? user.username: ""}</span>
    </div>
  )
}

export default Conversations