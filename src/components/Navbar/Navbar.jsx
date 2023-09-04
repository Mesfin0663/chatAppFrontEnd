import React, { useContext, useEffect, useRef, useState } from 'react'
import { AccessAlarm, ThreeDRotation, Person, Chat, Home } from '@mui/icons-material';
import './navbar.css';
// import { AuthContext } from '../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {logout, reset} from '../../redux/authSlice'
import {UserContext} from '../../contexts/UserContext'
import {FaUser} from 'react-icons/fa'
import {FaSignInAlt} from 'react-icons/fa'
import { SocketContext } from '../../contexts/SocketContext';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Mail, Notifications, Pets } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import {
 
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
 
} from "@mui/material";
import LeftDrawer from '../LeftDrawer/LeftDrawer';
import axios from '../../axios';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
function Navbar(props) {
  const { onlineUsers,socket
    
  } = useContext(SocketContext)
  const [onlineFriends, setOnlineFriends] = useState([])
  let activeStyle = {
    textDecoration: "underline",
    color:"white",

  };
  const [open, setOpen] = useState(false);

  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData,unreadPostCount} = useContext(UserContext)
  const [unreadMessageCount,setUnreadMessageCount] = useState(0)
   
 const username = useRef()
  const {user:authUser} = useSelector((state)=> state.auth)
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(()=>{
    const getUnreadMessageCount=async()=>{
      const config ={
        headers:{
            Authorization: `Bearer ${authUser.token}`
        }
    }
      try{
        const res = await axios.get(`/api/messages/get-unread-message-count/${authUser._id}`,config);
        // console.log("from contect------------",res.data)
        setUnreadMessageCount(res.data.unRedMessages)
        // socket.on("getMessage", data =>{ // executes whene the a new message arrives
        //   setUnreadMessageCount(res.data.unRedMessages+1)
        // }) 
      }catch(err){
  
      }
   
    }
    getUnreadMessageCount()
  },[])

 useEffect(() => {
  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  window.addEventListener('resize', handleWindowResize);

  return () => {
    window.removeEventListener('resize', handleWindowResize);
  };
}, []);
useEffect(()=>{
         

          
  // setOnlineFriends(user?.followings.filter((f)=> onlineUsers.some((u) => u.userId == f)))
setOnlineFriends(onlineUsers?.filter((u)=> userData?.followings.some((f)=>f ===u.userId)))
},[onlineUsers,socket])
const onLogout =()=>{
 
  dispatch(logout())
  dispatch(reset())

}
const handleSearch=()=>{
  navigate(`/profile/${username.current.value}`)
}
const handleChange = (value) => {
  // console.log(value);
};

const [options, setOptions] = useState([]);
const onInputChange = (event) => {
  setOptions(
    defaultOptions.filter((option) => option.includes(event.target.value))
  );
};
// console.log("............",unreadMessageCount)
    return (
      <>
      {
        authUser?
      <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs:"none",sm: "none", md: "block" } }}>
        <Link to ='/'><span className="logo">ሃሁ Chat</span></Link>
        </Typography>
        <LeftDrawer/>
        {/* <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} /> */}
        {/* ref={username}v
                onClick={handleSearch} */}
        <Box sx={{ display: 'flex', alignItems: 'center' ,backgroundColor:"white"}}>
            <Input
                placeholder={" Find friends"}
                inputRef={username}
                sx={{lg:{width: "180px"} ,md:{width: "100px"}, color: 'black', fontSize: '1.1rem'}}
                disableUnderline
                onKeyPress={
                  event => {
                    if (event.key === 'Enter') {
                      handleSearch()
                    }
                  }
                  }
            />
                        <SearchIcon sx={{ marginRight: '10px',color:"black" }} onClick={handleSearch} />

        </Box>
        <Box   sx={{ display: { xs: "none", sm: "block" } }}>
        <ListItem disablePadding>
         <Link to="/" style={{color:"inherit"}}>
         <ListItemButton component="a" href="#home">
        
              <Home />
            
            <ListItemText primary="Homepage" />
          </ListItemButton>
            </Link>
         
         </ListItem>    
            
            </Box>

        <Icons>
        <Link to ='/friends' style={{color: 'white'}} >

        <Badge badgeContent={onlineFriends.length} color="error">
        <Person />
          </Badge>
</Link>
<Link to ='/message-notifications' style={{color: 'white'}} >

          <Badge badgeContent={unreadMessageCount} color="error">
            <Mail />
          </Badge>
          </Link>
          <Link to ='/alerts' style={{color: 'white'}} >

          <Badge badgeContent={unreadPostCount} color="error">
            <Notifications />
          </Badge>
          </Link>
          <Link to ='/videochat' style={{color: 'white'}} >

<VideocamIcon/>
</Link>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={userData?.profilePicture ? userData?.profilePicture:  PF + "person/noAvatar.png"}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={userData?.profilePicture ? userData?.profilePicture:  PF + "person/noAvatar.png"}
          />
          {/* <Typography variant="span">{userData?.username}</Typography> */}
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        
      >
        <MenuItem> <Link to={`/profile/${userData?.username}`}> {userData?.username}</Link> </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={onLogout}><PowerSettingsNewIcon/>Logout</MenuItem>
      </Menu>
    </AppBar>:
    <AppBar position="sticky">
     <StyledToolbar>
      <Typography variant="h5" sx={{ display: { xs: "block", sm: "block" } }}>
      <Link to="/" > 
      <span style={{color:"white"}}>ሃሁ Chat👻</span> 
      </Link>
      </Typography>
      {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
  
      <Icons>
      
      </Icons>
      <Typography variant="h4">     <Link to="/login" >   <span style={{color:"white"}}>Login</span> </Link></Typography>


    </StyledToolbar>

  </AppBar>
      }
</>
    )
}


const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);
  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

const defaultOptions = [];
for (let i = 0; i < 10; i++) {
  defaultOptions.push(`option ${i}`);
  defaultOptions.push(`suggesstion ${i}`);
  defaultOptions.push(`advice ${i}`);
}

export default Navbar

