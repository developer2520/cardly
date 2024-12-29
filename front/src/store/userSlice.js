import { createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// Slice for managing user data
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;

// Thunk action to fetch user data using Axios
export const fetchUser = () => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const response = await api.get('/user'); // Replace `/user` with your endpoint
        dispatch(fetchUserSuccess(response.data));
    } catch (error) {
        dispatch(fetchUserFailure(error.message));
    }
};

export default userSlice.reducer;
