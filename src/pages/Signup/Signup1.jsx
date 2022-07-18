import React,{useState, useRef} from 'react';
import './signup.css';

import axios from '../../axios';
import { useNavigate } from 'react-router';
//import { withRouter } from 'react-router';
//import { useHistory } from "react-router-dom";

function Signup(){
    const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  //const history = useHistory();
const navigate= useNavigate()
const registerUser = async (e) =>{
    e.preventDefault();
   if(passwordAgain.current.value != password.current.value){
    password.current.setCustomValidity("Password don't match");
   }else{
     const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,

     };
     try{
      await axios.post( '/auth/register', user) ;
      navigate("/signin");
    //  history.push("/signin") 
    }catch(err){
       console.log(err);
     }
   }
  }

 
  return (
    <div className="signup">
        <div className="signupWrapper">

        <h1 className='signupTitle'>Signup</h1>
      <form onSubmit={registerUser} className="signupForm">

      <input 
             placeholder='Username' 
             className='input'
             ref = {username}
             required
             type = "text"
             />
        <input 
           
             placeholder= 'Email' 
             className='input'
             required
             ref = {email}
             type="email"
        />
       <input
         
            placeholder='Password' 
            className='input' 
            ref = {password}
            required
            type= "password"
            minLength="6"
        />
        <input
         
         placeholder='Confirm Password' 
         className='input' 
         required
         ref = {passwordAgain}
         type = "password"
         minLength="6"
     />
      <input 
           type="submit"  
           value = "Register" 
           className='submit'
       />

      </form>

        </div>
      
    </div>
  )
}

export default Signup;
