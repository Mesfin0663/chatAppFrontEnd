import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserContext } from '../contexts/UserContext';
import { decrement, increment,incrementByAmount } from "../redux/counterSlice";

function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {socket} = useContext(UserContext)
    console.log(socket.current)
    useEffect(()=>{
      console.log(socket.current)
  
    },[socket]) 
  return (
    <div>
          <h1>My app</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
              <button onClick={() => dispatch(incrementByAmount(33))}>
                increment by amonunt 33
</button>
      </div>
    </div>
  )
}

export default Counter