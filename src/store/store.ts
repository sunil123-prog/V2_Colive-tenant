import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from './slices/profileSlice';
import tenantHomeReducer from './slices/homeSlice';
import tenantContact from './slices/contactSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tenantHome: tenantHomeReducer,
    contacts: tenantContact
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
