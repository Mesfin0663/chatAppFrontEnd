import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import {format} from 'timeago.js'

const Conversation =({data, currentUserId , online}) =>{
  const [userData, setUserData] = useState(null)
  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;

  useEffect(()=>{
      const userId = data.members?.find((id)=>id!==currentUserId)
    
      console.log(userId)
           const getUser = async ()=>{
            try{
              const res = await axios("/api/users/getuser/?userId="+ userId);
      
              setUserData(res.data)
            }catch(err){
              console.log(err)
            }
          }
          getUser();
    },[data,online])
  return (
    <>
      <div className='follower conversation'>
      <div>
        {
          online?      <div className='online-dot'></div>
:""
        }
         <img src={userData?.profilePicture ? userData?.profilePicture:  PF + "person/noAvatar.png"} alt="" className="followerImage" 
         style={{width:"50px" , height:"50px"}}
         />
            <div className='name' style={{fontSize: "0.8rem", display:"grid"}}>
               <span>{userData?.username}</span>
               <span>{
               online? "Online":<>
               {
                userData?.onlineAt ? <>Last seen {format(userData?.onlineAt)}</>:"Offline"
               }
              </>}</span>
            </div>
      </div>
    
    </div>
    <hr style={{width: '85%',border: '0.1px, solid #ececec'}}/>
    </>
  
  )
}

export default Conversation