import React, { useState } from 'react'
import {  useNavigate } from 'react-router'
import { Outlet } from 'react-router-dom';

function Conversation(props) {
    let navigate = useNavigate();
    const [count,setCount] = useState(0) 
    console.log(props)
  return (
    <div>
  
          <div className="conversation" onClick={()=>{
        navigate("conversation")
    }} >
        <img src="/public/assets/default Profile.png" alt="" className="conversationImg" />
       <div className='message'>
       <span className="conversationNam">user2</span>
        <p>hello my friend ! {count}</p>
       </div>
    </div>
    <Outlet  context={[count,setCount]} />
    </div>
    
  )
}

export default Conversation