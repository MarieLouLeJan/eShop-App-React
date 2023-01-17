import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    JWT: null,
    isAdmin: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ACTIVE_USER (state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.JWT = action.payload.JWT;
        },
        REMOVE_ACTIVE_USER (state, action) {
            state.isLoggedIn = false;
            state.user = null;
            state.JWT = null;
        },
        SET_IS_ADMIN (state, action) {
            state.isAdmin = true
        },
        REMOVE_IS_ADMIN (state, action) {
            state.isAdmin = false
        }
    }
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_IS_ADMIN, REMOVE_IS_ADMIN } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectJWT = (state) => state.auth.JWT;
export const selectIsAdmin = (state) => state.auth.isAdmin;


export default authSlice.reducer;