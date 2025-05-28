import { createReducer } from '@reduxjs/toolkit';

const initialState = {}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase("LoadUserRequest", (state) => {
        state.loading = true;
    })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase("LoadUserFailure", (state, action) => {
            state.loading = false;
            // state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("LoginUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoginUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.message = action.payload.message;
        })
        .addCase("LoginUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("LogoutUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LogoutUserSuccess", (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload;
        })
        .addCase("LogoutUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("RegisterUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("RegisterUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase("RegisterUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("UpdateProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("UpdateProfileSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase("UpdateProfileFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("DeleteProfileRequest", (state) => {
            state.loading = true;
        })
        .addCase("DeleteProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase("DeleteProfileFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearError", (state) => {
            state.error = null;
        })
        .addCase("clearMessage", (state) => {
            state.message = null;
        })
})