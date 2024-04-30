import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userData: {},
   loading: true,
   error: null,
}

const user = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload
         state.loading = false
         state.error = null
      },
      setLoading: (state, action) => {
         state.loading = action.payload
      },
      setError: (state, action) => {
         state.loading = false
         state.error = action.payload
      },
   },
})

export const { setUserData, setLoading, setError } = user.actions

export default user.reducer
