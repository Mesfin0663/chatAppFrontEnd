import React from 'react'
import { format } from 'timeago.js'
import './messageUi.css'
import { useOutletContext } from "react-router-dom";

function MessageUi({own}) {
  const [count, setCount] = useOutletContext();
  
  return (
    <div>
      <button onClick={()=> setCount(count + 1)}>Increament</button>
         <div className="messageBox">
 <div className={own? "message own": "message"}>
    <div className="messageTop">
     
   
    <p className="messageText">
    <div className="senderInfo">
    <img src= "/assets/person/1.jpeg" alt="" className="messageImg" />
    <p>{own? "You:": "user1"+":"}</p>

  
     </div>
     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore id a rem deleniti? Odio ullam quisquam obcaecati, voluptatibus facilis porro.</p>
   
    </div>

    <div className="messageBottom">
  
  
      {format("2022-07-05T01:15:45.932+00:00")}</div>
   </div>
    </div>
    </div>
  )
}

export default MessageUi