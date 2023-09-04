import React, { useEffect, useState } from 'react'
import './message.css'
import {format} from "timeago.js";
import axios from '../../axios';
import PhoneIcon from '@mui/icons-material/Phone';
function Message({message,own,senderId}) {
  const [senderProfile, setSenderProfile ] = useState("");
  const [senderName, setSenderName] = useState("");
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  useEffect(()=>{
    const getSenderData = async () =>{
        try{
           const res = await axios.get("/api/users/getuser/?userId="+ senderId);
           setSenderProfile(res.data.profilePicture);
           setSenderName(res.data.username)
        }catch(err){
            console.log(err)
        }
    }
    getSenderData()
},[]);
// console.log(senderProfile);

  return (
    <div className="messageBox">
 <div className={own? "message own": "message"}>
    <div className="messageTop">
     
   
    <div className="messageText">
    <div className="senderInfo">
    <img src={senderProfile? senderProfile: PF + "person/noAvatar.png"} alt="" className="messageImg" />
    <p className=''>{own? "You:": senderName+":"}</p>

     </div>
     <p className='textf'>{message.text}</p>    
     
       </div>
   
    </div>

    <div className="messageBottom">
  
  
      {format(message.createdAt)}</div>
   </div>
    </div>
  
  )
}

export default Message