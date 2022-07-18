import React, { useEffect, useState } from 'react'
import './message.css'
import {format} from "timeago.js";
import axios from '../../axios';
function Message({message,own,senderId}) {
  const [senderProfile, setSenderProfile ] = useState("");
  const [senderName, setSenderName] = useState("");
  useEffect(()=>{
    const getSenderData = async () =>{
        try{
           const res = await axios.get("/users/"+ senderId);
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
     
   
    <p className="messageText">
    <div className="senderInfo">
    <img src={senderProfile? senderProfile: "assets/person/defaultProfile.png"} alt="" className="messageImg" />
    <p className=''>{own? "You:": senderName+":"}</p>

     </div>
     <p className='textf'>{message.text}</p>      </p>
   
    </div>

    <div className="messageBottom">
  
  
      {format(message.createdAt)}</div>
   </div>
    </div>
  
  )
}

export default Message