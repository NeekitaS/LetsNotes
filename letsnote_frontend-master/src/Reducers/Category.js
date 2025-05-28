import { createReducer } from '@reduxjs/toolkit';

const initialState = {}

export const categoryReducer = createReducer(initialState, (builder) => {
    builder.addCase("LoadCategoryRequest", (state) => {
        state.loading = true;
    })
        .addCase("LoadCategorySuccess", (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase("LoadCategoryFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("updateCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("updateCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("updateCategoryFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("deleteCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("deleteCategorySuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryFailure", (state, action) => {
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