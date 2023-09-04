import { Videocam } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Notifications from "../../components/VedoChat/Notifications";
import Options from "../../components/VedoChat/Options";
import VedioChat from "../../components/VedoChat/VedioChat";
import { SocketContext } from "../../contexts/SocketContext";


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
function VideoChatHOme() {
  const {  
  
    startVideo,
  
    
  } = useContext(SocketContext)
useEffect(()=>{
startVideo()
},[])
  return (
    <div className="wrapper">
  <Box sx={{padding:"10px"}}>
  <Videocam sx={{ fontSize: 40}}/>
  </Box>

      {/* <h1>Video Chat</h1> */}
      <Notifications/>
       <VedioChat/>
       <Options>
       
       </Options>

       
    </div>
  );
}

export default VideoChatHOme;
