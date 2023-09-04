import React, { useEffect, useState } from 'react'
import axios from '../../../axios';
import {  useLocation, useNavigate, useParams } from 'react-router'
import { useOutletContext } from "react-router-dom";
import { Outlet } from 'react-router-dom';

import './conversations.css'
function Conversations({conversations,user,setConversID}) {
    //const [conversations, user, socketData] = useOutletContext();
  
    const location = useLocation();
   console.log(location.pathname);
   useEffect(()=>{
    console.log(location.pathname);

   },[location.pathname])
    return(
        <>
           {
                conversations.map((c)=>(
                    <div key={c._id} >
                  <ConversatinList  conversation={c} currentUser= {user} setConversID={setConversID}/>
                   </div>
                ))
               }
             <Outlet/>  
        </>
    )
}
function ConversatinList({conversation,currentUser,setConversID}){
    let navigate = useNavigate();
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
    
    <div>
          <div className="conversation" onClick={()=>{
            
            setConversID(conversation._id)
            
        navigate(`chat`)
    }} >
        <img src={user.profilePicture ? user.profilePicture:  PF + "person/noAvatar.png"} alt="" className="conversationImg" />
       <div className='message'>
       <span className="conversationName">{user? user.username: ""}</span>
        <p>hello my friend !</p>
       </div>
    </div>
 
    </div>
  )
}
export default Conversations