import React, { useContext, useState } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import {Button,Container,TextField,Typography,Paper,Grid} from '@mui/material';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneIcon from '@mui/icons-material/Phone';

function Notifications() {
    const {  call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,} = useContext(SocketContext)

        const [idToCall, setIdToCall]=useState('');
        const classes= useState();


  return (
   
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{display: 'flex', justifyContent: "center"}}>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <h1 style={{color: 'green', marginRight:"30px"}}> <label style={{color: 'red'}}>{call.name}</label> is calling !!</h1>
        <button style={{backgroundColor: '#ACFFAB',borderRadius:"50%"}} onClick={answerCall}><PhoneIcon/>Answer</button>
       
        </div>
        </div>
      )}
    </>
  )
}

export default Notifications;