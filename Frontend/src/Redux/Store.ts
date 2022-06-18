import { configureStore } from '@reduxjs/toolkit';
import vacationsReducer from './VacationSlice';
import authReducer from './AuthSlice';

export const store = configureStore({
    reducer: {
        authStore: authReducer,
        vacationsStore: vacationsReducer,
    }
});