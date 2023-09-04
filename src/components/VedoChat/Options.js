import React, { useContext, useState } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import {Button,Container,TextField,Typography,Paper,Grid} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
function Options({children}) {
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
        answerCall,
        userToCall
        
      } = useContext(SocketContext)

        const [idToCall, setIdToCall]=useState('');
        const classes= useState();


  return (
    <div className="optionsWrapper" style={{display:"flex", alignItems:"Center", justifyContent:"center", }}>
         <Container  sx={{width:{xl:"100px",xs:"80%"} ,margin: "35px 0" , padding: 0,maxWidth: "600px"}}>
            <form sx={{display:"flex", flexDirection:'column'}} noValidate autoComplete='off'>
            <Grid  container className='gridContainer'>
                         <Grid item xs={12} md={6} className='padding'>
                            <Typography guttorbottom="true" variant='h6'>Account Info</Typography>
                            <TextField label="Name"  value={name} onChange ={(e)=> setName(e.target.value)} fullwidth="true"/>
              
                         </Grid>
                   </Grid>
                   <Grid  container className='gridContainer'>
                         <Grid item xs={12} md={6} className='padding'>
                            {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabledIcon fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
              ""
              )}
                         </Grid>
                   </Grid>
            </form>
        {children}
    </Container>
    </div>
 
  )
}

export default Options