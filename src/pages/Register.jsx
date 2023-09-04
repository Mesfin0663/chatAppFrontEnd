import React from 'react'
import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import './register.css'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../redux/authSlice'
import Spinner from '../components/Spinner'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Register() {
    const [formData,setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const {username,email, password, password2} = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const {user,isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    },[user, isError, isSuccess,message,navigate,dispatch])

    const onChange = (e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  
    if(password != password2){
        toast.error('Password do not match')
    }else{
        const userData = {
            username, email, password
        }
        dispatch(register(userData))
    }
  }


    return (
        <>
        {
            isLoading?
<>
<Box sx={{ display: 'flex', justifyContent:"center",  alignItems:"center",minHeight: '100vh' }}>
      <CircularProgress />
    </Box>
    
</>
            :
            <div className='registerPage'>
            <div className="registerWrapper">
            <section className="heading">
            <h1 className=' text-primary'>
                 <FaUser/> Register
            </h1>
            <p className=' text-primary'>please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={handleSubmit} className="text-dark">
                <div className="form-group">
                <input type="text" className='form-control' id='username' name='username' value={username} placeholder='Enter your name' onChange={onChange}/>
                <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                <input type="password" className='form-control' id='password2' name='password2' value={password2} placeholder='Confirm your password' onChange={onChange}/>
                <button type='submit' className='btn btn-outline-primary text-dark' >Submit</button>
                </div>
            </form>
        </section>
        <div style={{display:"flex",justifyContent:"center",  alignItems:"center", marginTop:"20px" }}>
        <p className=' text-dark' style={{margin:"0 10px"}}>Already have an account?</p>
        <Link to="/login">
        <button className="btn btn-outline-primary text-dark">Login</button>

        </Link>
        </div>
            </div>
       
        </div>
        }
        </>
  
 
  )
}

export default Register