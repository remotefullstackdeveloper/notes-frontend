import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils';




export const getNotes = createAsyncThunk('note/getNotes', async (payload) => {
    console.log("payload",payload)
    let url = payload.filters ? `${API_URL}/note${payload.filters}` : `${API_URL}/note`;

    console.log("urll:", url)
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${payload.token}` } })
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
    currentNote: null,
    notesList: [],
    loading: false,
    loadingNotes: false,
    error: null,
};

const notes = createSlice({
    name: 'notes',
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
    extraReducers: (builder) => {
        builder
            .addCase(getNoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNoteById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentNote = action.payload;
            })
            .addCase(getNoteById.rejected, (state, action) => {
                state.loadingNotes = false;
                state.error = action.error.message;
            })
            .addCase(getNotes.pending, (state) => {
                state.loadingNotes = true;
                state.error = null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loadingNotes = false;
                state.notesList = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                console.log("error", action.error.message)
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                try {
                    state.loading = false;
                    let filteredNotes = state.notesList.filter(f => f.id !== action.meta.arg.id)
                    state.notesList = filteredNotes;
                    toast.success('Note deleted Successfully!')
                } catch (error) {
                    toast.error('Something went wrong, Please try again!')
                }
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                try {
                    state.loading = false;
                    let index = state.notesList.findIndex(f => f.id === action.payload.id)
                    if (index > -1) {
                        let notes = [...state.notesList];
                        notes[index] = { ...action.payload };
                        state.notesList = [...notes];
                    }
                    toast.success('Note updated Successfully!')
                } catch (error) {
                    toast.error('Something went wrong, Please try again!')
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
});

export const { setToken, setLoading, setError } = notes.actions;
export default notes.reducer;
