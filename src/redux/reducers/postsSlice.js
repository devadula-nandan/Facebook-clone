import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:9000";

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get(`${apiUrl}/posts/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.delete(`${apiUrl}/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const createPost = createAsyncThunk(
    'posts/createPost',
    async (post, thunkAPI) => {
        try {
            console.log(post)
            if(post.postImg){
                const uploadData = new FormData();
                uploadData.append("destination", "images/posts");
                uploadData.append("file", post.postImg);
                post.postImg = (await axios.post(`${apiUrl}/upload`, uploadData)).data.url
            }
            const { data } = await axios.post(`${apiUrl}/posts`, post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return { ...data, User: JSON.parse(localStorage.getItem("user")) };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        isLoading: false,
        skeleton: true,
        error: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.skeleton = true
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.skeleton = false
                state.data = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.skeleton = false
                state.error = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter(post => post.id !== action.payload)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.skeleton = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.skeleton = false
                state.data = [...state.data, action.payload]
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.skeleton = false
                state.error = action.payload
            })
    }
})

export default postsSlice.reducer
export const { resetError } = postsSlice.actions
export const selectPosts = (state) => state.posts