import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate,useParams } from "react-router-dom";
import {format} from "timeago.js";
import MessageUi from './MessageUI/MessageUi';
import './ChatUi.css'
function ChatUi() {
    console.log("chattttttttttttt")
    const navigate = useNavigate();
    let {convid}= useParams()
  return (
    <div className='ChatScreen'>
         <div className="gobackArrow">
      <ArrowBackIcon fontSize="large" onClick={() => navigate(-1)} />

      </div>

      <div>
       <MessageUi/>
       <MessageUi/>
       <MessageUi own={true}/>
      </div>
   
      </div>
  )
}

export default ChatUi