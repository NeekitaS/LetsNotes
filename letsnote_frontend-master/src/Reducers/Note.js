import { createReducer } from '@reduxjs/toolkit';

const initialState = {}

export const notesReducer = createReducer(initialState, (builder) => {
    builder.addCase("LoadNotesRequest", (state) => {
        state.loading = true;
    })
        .addCase("LoadNotesSuccess", (state, action) => {
            state.loading = false;
            state.notes = action.payload;
        })
        .addCase("LoadNotesFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("DeleteNoteRequest", (state) => {
            state.loading = true;
        })
        .addCase("DeleteNoteSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("DeleteNoteFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AddNoteRequest", (state) => {
            state.loading = true;
        })
        .addCase("AddNoteSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("AddNoteFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("EditNoteRequest", (state) => {
            state.loading = true;
        })
        .addCase("EditNoteSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("EditNoteFailure", (state, action) => {
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