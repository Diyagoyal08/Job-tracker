 import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: false,
  userData: null,
  loading: true,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    login: (state, action) => {
      state.status  = true
      state.userData = action.payload
      state.loading  = false
      state.error    = null
    },

    logout: (state) => {
      state.status   = false
      state.userData = null
      state.loading  = false
      state.error    = null
    },

    loginStart: (state) => {
      state.loading = true
      state.error   = null
    },

    loginFailure: (state, action) => {
      state.loading = false
      state.error   = action.payload
      state.status  = false
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    }

  }
})

export const { login, logout, loginStart, loginFailure, setLoading } = authSlice.actions
export default authSlice.reducer
