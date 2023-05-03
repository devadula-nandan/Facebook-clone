import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:9000";

export const signUp = createAsyncThunk(
    'user/signUp',
    async (user, thunkAPI) => {
        console.log(user);
        try {
            if(user.avatar){
            // const { data: { url: avatar } } = await axios.post(`${apiUrl}/upload`, formData);
                const uploadData = new FormData();
                uploadData.append("destination", "images/users");
                uploadData.append("file", user.avatar);
                user.avatar = (await axios.post(`${apiUrl}/upload`, uploadData)).data.url
            }
            const { data } = await axios.post(`${apiUrl}/users`, user);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (user, thunkAPI) => {
        try {
            const { data } = await axios.post(`${apiUrl}/users/login`, user);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || undefined,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = {};
        },
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
export const { logout, resetError } = userSlice.actions;
export const selectUser = (state) => state.user;
