import React,{useState, useRef, useContext} from 'react';
import { signinCall } from '../../apiCalls';
import axios from '../../axios';
import './signin.css';
import {AuthContext} from '../../context/AuthContext'
import { CircularProgress } from '@mui/material';

function Signin() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} =useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const [apiResponse, setApiResponse] = useState({});

  const LoginUser = async (e)=>{
    e.preventDefault();
    setLoading(true);
    await axios.post( '/auth/login',{
      email: email.current.value,
      password: password.current.value
    }) 
    .then((res)=>{
      setApiResponse(res.data);

    }).catch((err)=>{
      setApiResponse(err);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const handleLoginClick = async (e) =>{
    e.preventDefault();

   signinCall({email:email.current.value, password:password.current.value}, dispatch)
  }

  return (
    <div className="signin">
        <div className="signinWrapper">

        <h1 className='signinTitle'>Sign In</h1>
      <form onSubmit={handleLoginClick} className="signinForm">


      <input 
           
      type="email" placeholder= 'Email' className='input' required ref={email} />
      <input
      type="password" placeholder='Password' className='input' required ref={password} />

      <button  className="submit" type="submit">{isFetching? <CircularProgress style={{ color: "white", fontWeight: 'bold' }} size = "20px" />: "Submit" }</button>

      </form>

        </div>
  
    </div>
  )
}

export default Signin