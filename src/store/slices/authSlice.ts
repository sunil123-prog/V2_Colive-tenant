import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error?: string;
}

const AUTH_STORAGE_KEY = "authState";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: undefined,
};

// Async thunk to logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
});

// Async thunk to restore auth state from AsyncStorage
export const restoreAuth = createAsyncThunk("auth/restore", async () => {
  try {
    const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return { user: null, token: null };
  } catch (err) {
    console.error("Restore auth failed:", err);
    return { user: null, token: null };
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: state.user, token: state.token })
      ).catch((err) => console.error("Failed to save auth state:", err));
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem(AUTH_STORAGE_KEY).catch((err) =>
        console.error("Failed to remove auth state:", err)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.error = "Logout failed";
      })
      // Restore auth
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        restoreAuth.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(restoreAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
