import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils';




export const getUser = createAsyncThunk('note/getUser', async (payload) => {
    const response = await axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${payload.token}` } })
    return response.data;
});

export const getNoteById = createAsyncThunk('note/getNoteById', async (payload) => {
    const response = await axios.get(`${API_URL}/note/${payload.id}`, { headers: { Authorization: `Bearer ${payload.token}` } })
    return response.data;
});

export const deleteNote = createAsyncThunk('note/deleteNote', async (payload) => {
    const response = await axios.delete(`${API_URL}/note/${payload.id}`, { headers: { Authorization: `Bearer ${payload.token}` } })
    return response.data;
});


export const updateNote = createAsyncThunk('note/updateNote', async (payload) => {
    const response = await axios.patch(`${API_URL}/note/${payload.id}`, { ...payload.data }, { headers: { Authorization: `Bearer ${payload.token}` } })
    return response.data;
});

const initialState = {
    // Define your initial state here
    user: null,
    loading: false,
    error: null,
};

const users = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            

    },
});

export const { setUser, setLoading, setError } = users.actions;
export default users.reducer;
