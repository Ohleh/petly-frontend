import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://petly-backend-vopf.onrender.com/api';

export const fetchCurrentUser = createAsyncThunk(
    'users/current',
    async (_, thunkApi) => {
        const state = thunkApi.getState();
        const persisterToken = state.user.token;
        if (persisterToken === null) {
            return thunkApi.rejectWithValue()
        }
        try {
            const { data } = await axios.get('https://petly-backend-vopf.onrender.com/api/users/current');
            return data
        } catch (error) {
            return error;
        }
    }
);


export const fetchUserPets = createAsyncThunk(
    `/mypets`,
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await axios.get(`https://petly-backend-vopf.onrender.com/api/mypets`);
            console.log(data)
            return data;
        
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const userLogOut = createAsyncThunk(
    'user/logout',
    async (_, thunkApi) => {
        try {
            await axios.post('/users/logout');
            
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const removePetCard = createAsyncThunk(
    "mypets/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/mypets/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);
export const patchContact = createAsyncThunk(
    "users/update",
    async (id, thunkApi) => {
        const state = thunkApi.getState()
        const { name, number } = state.modal.editContact
        try {
            const { data } = await axios.patch(`/users/${id}`, {name, number})
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);