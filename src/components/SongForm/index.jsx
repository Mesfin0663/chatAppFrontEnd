import React,{ useContext, useEffect ,useRef} from "react";
import { useState } from "react";
import axios from "../../axios";
import FileInput from "../FileInput";
import styles from "./styles.module.css";
import Song from "../Songs/index"
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import {UserContext} from '../../contexts/UserContext'
const SongForm = () => {
	const {user} = useSelector((state)=> state.auth)
	const {socket} = useContext(UserContext)
	console.log(socket.current)
	useEffect(()=>{
	  console.log(socket.current)

	},[socket])  
	const [data, setData] = useState({
		name: "",
		artist: "",
		song: "",
		img: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			//const url = process.env.REACT_APP_API_URL + "/songs"
			const { data : res } = await axios.post("/api/songs", data);
			// console.log(res)
		} catch (error) {
			console.log(error)
		}
	};
  const [songs, setSongs] = useState(null);
  useEffect(()=>{
     const getAllSongs= async()=>{
       try{
        const res = await axios.get("/api/songs")
		//console.log(res.data.data)
		setSongs(res.data.data)
	   }catch(err){
      console.log(err)
	   }
	 }
	 getAllSongs()
  },[])
  useEffect(()=>{
	//ws://localhost:8900
   // socket.current = io("https://hahu-chat-app-socket.herokuapp.com/");
   //console.log(socket.current)
	
	  if(socket.current){
		socket.current.on("ping", (data) =>{ // executes whene the a new message arrives
		 console.log(data)
		 
		})
	 
	   console.log("socket Event")  
	  }
  },[socket])
  const sendPing = () => {
    socket.current.emit('ping from input',user._id);
	console.log("sendping")
  }
	return (
		<>
					      <button onClick={ sendPing }>Send ping</button>
						
						  <div className={styles.container}>

<form className={styles.form} onSubmit={handleSubmit} >
	<h1 className={styles.heading}>Song Form</h1>
	<input
		type="text"
		className={styles.input}
		placeholder="Song Name"
		name="name"
		onChange={handleChange}
		value={data.name}
	/>
	<input
		type="text"
		className={styles.input}
		placeholder="Artist Name"
		name="artist"
		onChange={handleChange}
		value={data.artist}
	/>
	<FileInput
		name="img"
		label="Choose Image"
		handleInputState={handleInputState}
		type="image"
		value={data.img}
	/>
	<FileInput
		name="song"
		label="Choose Song"
		handleInputState={handleInputState}
		type="audio"
		value={data.song}
	/>
	<button type="submit" className={styles.submit_btn} >
		Submit
	</button>
</form>

<div className="song_container">
	  {
		 songs?.map((song)=>(
			<Song song={song} key={song._id}/>
		))
	  }
</div>
</div>
		</>
		
	);
};

export default SongForm;
