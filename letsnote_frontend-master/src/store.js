import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './Reducers/User';
import { categoryReducer } from './Reducers/Category';
import { notesReducer } from './Reducers/Note';

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        note: notesReducer
    }
})

export default store;