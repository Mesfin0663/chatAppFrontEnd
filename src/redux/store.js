import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './authSlice'
import goalReducer from './goals/goalSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    goals: goalReducer
  },
})