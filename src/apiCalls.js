import axios from "axios"
const axio = axios.create({
  //baseURL: 'http://localhost:5500/api',
  baseURL:'https://hahu-chatapp.herokuapp.com/api',
  timeout: 300000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
})

export const signinCall = async (userCredential, dispatch) =>{
    dispatch({type: "LOGIN_START"});
    try{
      await axio.post( '/auth/login',userCredential) 
      .then((res)=>{

       console.log(res.data);
       dispatch({type: "LOGIN_SUCCESS", payload: res.data});

      })

    }catch(err){
      dispatch({type: "LOGIN_FAILURE", payload: err});   
    }

}

export const signupCall = async (userCredential, dispatch) =>{
  dispatch({type: "LOGIN_START"});
  try{
    await axio.post( '/auth/login',userCredential) 
    .then((res)=>{

     console.log(res.data);
     dispatch({type: "LOGIN_SUCCESS", payload: res.data});

    })

  }catch(err){
    dispatch({type: "LOGIN_FAILURE", payload: err});   
  }

}