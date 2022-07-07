import React,{useState} from 'react';
import axios from '../../axios';
import './signup.css';

function Signup(){
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8800/api/auth/register', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username,
        email,
        password,
      })
    })
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="signup">
        <div className="signupWrapper">

        <h1 className='signupTitle'>Signup</h1>
      <form onSubmit={registerUser} className="signupForm">

      <input 
       value = {username}
       onChange = {(e)=> setName(e.target.value)}
      type="text" placeholder='Name' className='input'/>
      <input 
             value = {email}
             onChange = {(e)=> setEmail(e.target.value)}
      type="email" placeholder= 'Email' className='input'/>
      <input
             value = {password}
             onChange = {(e)=> setPassword(e.target.value)}
      type="password" placeholder='Password' className='input' />
      <input type="submit" value = "Register" className='submit'/>

      </form>

        </div>
  
    </div>
  )
}

export default Signup