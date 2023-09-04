import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../../axios';

function SingleConversation({conversation}) {
    const {user:authUser} = useSelector((state)=> state.auth)

    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
    useEffect(()=>{
      const friendId = conversation.members?.find((m)=> m !== authUser._id);
  
      const getUser = async ()=>{
        try{
          const res = await axios("/api/users/getuser/?userId="+ friendId);
  
          setUser(res.data)
        }catch(err){
          console.log(err)
        }
      }
      getUser();
    }, [ conversation])
  return (
    <div className="conversation">
    <img src={user.profilePicture ? user.profilePicture:  PF + "person/noAvatar.png"} alt="" className="conversationImg" />
    <span className="conversationName">{user? user.username: ""}</span>
</div>
  )
}

export default SingleConversation
