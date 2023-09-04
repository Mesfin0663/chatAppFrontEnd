import axios from "../axios"
import logger from "../utitlities/Logger"

const API_URL = '/api/users'

// Register user
logger("Auth Service", "L7")
const register = async(userData)=>{
    const response = await axios.post(API_URL, userData)
    console.log(response)
    if(response.data){
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data   
}
// Login user

const login = async(userData)=>{
    const response = await axios.post(API_URL + '/login', userData)
    console.log(response)
    if(response.data){
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout =()=>{
    localStorage.removeItem('user')
}
const authService ={
    register,
    logout,
    login
}
export default authService