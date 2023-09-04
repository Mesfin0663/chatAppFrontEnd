import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import axios from '../axios';
import { createSignalProtocolManager, SignalServerStore } from "../signal/SignalGateway"

const SocketContext = createContext();

// const socket = io('http://localhost:8900');
const socket = io(process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_SOCKET_URL:process.env.REACT_APP_PROD_SOCKET_URL)

const ContextProvider = ({ children }) => {
  const {user} = useSelector((state)=> state.auth)
  const [signalProtocolManagerUser,setSignalProtocolManagerUser] = useState();

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
const [userToCall,setUserToCall]= useState()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatChoice, setChatChoice] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
 const [messageArrived,setMessageArrived]=useState({});
 const [unreadMessageCount,setUnreadMessageCount]= useState()
  const startVideo= async()=>{
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);

    });
    
  }
//   useEffect(()=>{
//     if(user){
//      createSignalProtocolManager(user._id, user.name,  new SignalServerStore())
//      .then(signalProtocolManagerUser => {
//        console.log(signalProtocolManagerUser)
//        setSignalProtocolManagerUser(signalProtocolManagerUser);
//      })

//     }
// },[user])
  useEffect(() => {
    if(chatChoice == "video"){}
 

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
   
      setCall({ isReceivingCall: true, from, name: callerName, signal });

    });
    socket.emit("addUser",user?._id);
    socket.on("getUsers", users=>{
        setOnlineUsers(users)
        // console.log("from socket io",users)
      })
      
      socket.on("getMessage", data =>{ // executes whene the a new message arrives
        toast.success(`${data.senderName} Sent you a message "${data.text}" !!`)
        socket.emit("messageReceived",{
          conversationId: data.conversationId,
          senderId: user._id,
          receiverId:data.senderId,
          text: data.text,
          senderName: user.username,
          createdAt: Date.now()
      })
      
       })  

       socket.on("get-secureMessage", data =>{ // executes whene the a new message arrives
        toast.success(`${data.senderName} Sent you a message On secure Channel !!`)
        socket.emit("secure-messageReceived",{
          conversationId: data.conversationId,
          senderId: user._id,
          receiverId:data.senderId,
          senderName: user.username,
          createdAt: Date.now()
      })
      
       }) 

       socket.on("yourMessageHasbeenRead", data =>{ // executes whene the a new message arrives
        // toast.success(`${data.senderName} Received your message !!`)
        setMessageArrived(data)
       })  
       socket.on("your-secureMessageHasbeenRead", data =>{ // executes whene the a new message arrives
        // toast.success(`${data.senderName} Received your message !!`)
        setMessageArrived(data)
       })  
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log('callling', id)
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
     //caller-id=me, caller-name = name,
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
      
      toast.success(`Calling ......!!`)
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
 
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  useEffect(()=>{
    if( call.isReceivingCall && !callAccepted ){
      toast.success(`${call.name} is calling please answare`)
    }

   },[call])
  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    socket.emit("userHangup", {userId:user?._id,userName: user.username});
    window.location.reload();

  };
useEffect(()=>{
  const getUnreadMessageCount=async()=>{
    const config ={
      headers:{
          Authorization: `Bearer ${user?.token}`
      }
  }
    try{
      const res = await axios.get(`/api/messages/get-unread-message-count/${user._id}`,config);
      console.log("from contect------------",res.data)
      setUnreadMessageCount(res.data.unRedMessages)
    }catch(err){

    }
  }
  getUnreadMessageCount()
},[])
  return (
    <SocketContext.Provider value={{
      call,
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
      startVideo,
      socket,
      onlineUsers,
      userToCall,
      setUserToCall,
      messageArrived,
      unreadMessageCount,
      // signalProtocolManagerUser

    }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
