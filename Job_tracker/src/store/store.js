import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobs from "./slices/jobSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  }
})

export default store