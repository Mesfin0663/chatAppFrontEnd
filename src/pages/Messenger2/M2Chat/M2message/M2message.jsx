import React, { useEffect, useState } from 'react'

import './m2message.css'
import {format} from "timeago.js";
import axios from '../../../../axios';
function M2message({message,own,senderId}) {
  const [senderProfile, setSenderProfile ] = useState(null);
  const [senderName, setSenderName] = useState("");
  const PF = import.meta.env.VITE_NODE_ENV==="development"? import.meta.env.VITE_REACT_APP_DEV_PUBLIC_FOLDER:import.meta.env.VITE_REACT_APP_PROD_PUBLIC_FOLDER;
  const [loading,setLoading]= useState(true)
  useEffect(()=>{
    const getSenderData = async () =>{
        try{
           const res = await axios.get("/api/users/getuser/?userId="+ senderId);
           setSenderProfile(res.data.profilePicture);
           setSenderName(res.data.username)
           setLoading(true)
        }catch(err){
            console.log(err)
        }
    }
    getSenderData()
},[]);
    return (
      <>
       {
        loading?
        <div>
        <div className="messageBox">
<div className={own? "message own": "message"}>
   <div className="messageTop">
    
  
   <p className="messageText">
   <div className="senderInfo">  
   <img src={senderProfile ? senderProfile: PF + "person/noAvatar.png"} alt="" className="conversationImg" />
<p >{own? "You:": senderName+":"}</p>
    </div>
    <p className='textf'>{message.text}</p>
</p>
  
   </div>

   <div className="messageBottom">
 
 
     {format(message.createdAt)}</div>
  </div>
   </div>
   </div>


       :  <div></div>
     
       }
       </>
      )
}

export default M2message