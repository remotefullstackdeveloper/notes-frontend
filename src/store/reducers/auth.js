import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


  
const initialState = {
  token: null,
  loading: false,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setToken, setLoading, setError } = auth.actions;
export default auth.reducer;
