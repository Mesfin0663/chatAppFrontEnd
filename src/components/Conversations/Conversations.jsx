import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import './conversation.css'
function Conversations({conversation, currentUser}) {
  const [user, setUser] = useState({});
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m !== currentUser._id);

    const getUser = async ()=>{
      try{
        const res = await axios("/users?userId="+ friendId);

        setUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser();
  }, [ currentUser, conversation])
  return (
    <div className="conversation">
        <img src={user.profilePicture ? user.profilePicture:  "/public/assets/default Profile.png"} alt="" className="conversationImg" />
        <span className="conversationName">{user? user.username: ""}</span>
    </div>
  )
}

export default Conversations