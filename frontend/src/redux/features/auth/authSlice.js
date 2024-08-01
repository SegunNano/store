import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};


const reducers = {
    setCredentials: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        const expirationTime = new Date().getTime() + 30 * 24 * 3600 * 1000;
        localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
        state.userInfo = null;
        localStorage.clear();
    }
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers,
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;