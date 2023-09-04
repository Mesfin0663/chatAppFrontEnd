import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions,  Cancel} from '@mui/icons-material';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import axios from "../../axios";
import {UserContext} from '../../contexts/UserContext'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase/firebase";
import check from "../../check.png";
import FileInput from "../FileInput";
// import styles from "./styles.module.css";
import CircularProgress from '@mui/material/CircularProgress';

export default function Share() {
  const {user} = useSelector((state)=> state.auth)
  const {userData} = useContext(UserContext)
	const [data, setData] = useState({
		name: "",
		artist: "",
		song: "",
		img: "",
	});

  const PF = process.env.REACT_APP_NODE_ENV==='development' ? process.env.REACT_APP_DEV_PUBLIC_FOLDER:process.env.REACT_APP_PROD_PUBLIC_FOLDER;
  const desc= useRef();
  const [file,setFile] = useState(null)
  const [imgUrl,setImgUrl] = useState(null)
const [uploading,setUploading] = useState(false)
  const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);

	// const handleUpload = () => {
	// 	setProgressShow(true);
	// 	const fileName = new Date().getTime() + value.name;
	// 	const storageRef = ref(
	// 		storage,
	// 		type === "audio" ? `/audio/${fileName}` : `/images/${fileName}`
	// 	);
	// 	const uploadTask = uploadBytesResumable(storageRef, value);
	// 	uploadTask.on(
	// 		"state_changed",
	// 		(snapshot) => {
	// 			const uploaded = Math.floor(
	// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
	// 			);
	// 			setProgress(uploaded);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		},
	// 		() => {
	// 			getDownloadURL(uploadTask.snapshot.ref).then((url) => {
	// 				handleInputState(name, url);
	// 			});
	// 		}
	// 	);
	// };

  // const handleChange = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
	// };

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};
  const submitHandler = async (e)=>{
    e.preventDefault()
    const config ={
      headers:{
          Authorization: `Bearer ${user.token}`
      }
  }
  const newPost ={
    userId:user._id,
    desc: desc.current.value,
    img: imgUrl,
    posterName:user.username
  }
    if (file) {
      setUploading(true)
      const data = new FormData();
      const fileName = Date.now() + file.name;
      const storageRef = ref(
        storage,
         `/images/${fileName}`
      );
      data.append("name", fileName);
      data.append("file", file);
 
      try {
          const uploadTask =   uploadBytesResumable(storageRef, file);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
          },
          (error) => {
            console.log(error);
          },
          async() => {
            await getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
              // handleInputState(name, url);
              console.log(url)

              setImgUrl(url) ;
           
             const res= await axios.post("/api/posts/create", {
                userId:user._id,
                desc: desc.current.value,
                img: url,
                posterName:user.username
              },config)
            console.log(res)
            }
            
            )
            window.location.reload();
          }
        );
      
      } catch (err) {
        console.log(err)
      }
    }else{
      try {
     
  console.log(newPost)
        await axios.post("/api/posts/create", newPost,config)
        window.location.reload();
      } catch (err) {}
    }
  
              //  window.location.reload();

 
  }
  const [value, setValue] = useState('');

  return (
    <Box className="share" >

      <Box className="shareWrapper">
       
        <Box className="shareTop">
          <img className="shareProfileImg" src={userData?.profilePicture?userData.profilePicture: PF + "person/noAvatar.png"} 
          
          alt="" />
          {/* <input
            placeholder={`What's in your mind ?`}
            className="shareInput"
            ref={desc}
          /> */}
         <ReactQuill theme="snow" value={value} onChange={setValue} ref={desc} placeholder={`What's in your mind ?`}/>

          
        </Box>
        <hr className="shareHr"/>
        {file && (
          <Box className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </Box>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <Box className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display: "none"}} type="file" id= "file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <Box className="shareOption" sx={{display:{xs:"none",sm:"none"}}}>
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </Box>
                {/* <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div> */}
                <Box className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </Box>
            </Box>
            <button className="shareButton" type="submit">{uploading? <CircularProgress/>:"Post"}</button>
        </form>
      </Box>
    </Box>
  );
}
