import { baseApi } from './api/baseApi';
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer';
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})