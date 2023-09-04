import React from 'react'
import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import './register.css'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../redux/authSlice'
import Spinner from '../components/Spinner'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, Container } from '@mui/material'
function Login() {
    const [formData,setFormData] = useState({
    
        email: '',
        password: '',
      
    })
    const {email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const [loginMessage,setLoginMessage]= useState()
    const {user,isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)
    useEffect(()=>{
      if(isError){
          toast.error(message)
          setLoginMessage(message)
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
  const userData = {
    email,
    password,
  }
    dispatch(login(userData))
  }

  // if(isLoading){
  //   return <Spinner/>
  // }
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
        
        
        <Card className='registerPage'>
              <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <section className="heading">
        <h1 className='text-primary'>
             <FaSignInAlt/> Login ሃሁ
        </h1>
        <p className='text-primary'>Login and start Chating</p>
    </section>
    <section className="form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
            <button type='submit'className='btn btn-outline-primary text-dark' >Login</button>
          {
            loginMessage ?
            <Typography>

<Alert severity="error">  {loginMessage}</Alert>

         
                      </Typography>:
                      ""
          }
       
      
            </div>
        </form>
       
    </section>
      </CardContent>
      <CardActions>
      <div style={{display:"flex",justifyContent:"center",  alignItems:"center", marginTop:"20px" }}>
       
      <Typography level="h4" component="h1" sx={{padding:"10px"}}>Dont have an account?</Typography>

        <Link to="/register">
        <button className="btn btn-outline-primary text-dark">Register</button>

        </Link>
        </div>      </CardActions>
    </Card>
       
      
    </Card>
      }
 
      </>
    
 
  )
}

export default Login