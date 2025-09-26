import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../../constants/url";


// Define the profile type
interface ProfileState {
  fullName: string;
  email: string;
  mobile: string;
  profilePic?: string;
  loading: boolean;
  error?: string;
}

// Initial state
const initialState: ProfileState = {
  fullName: "",
  email: "",
  mobile: "",
  profilePic: undefined,
  loading: false,
  error: undefined,
};

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (tenantId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASEURL}9491/api/v1/tenants/${tenantId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileField: (
      state,
      action: PayloadAction<{ key: keyof ProfileState; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearProfile: (state) => {
      state.fullName = "";
      state.email = "";
      state.mobile = "";
      state.profilePic = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.mobile = action.payload.mobile;
        state.profilePic = action.payload.profilePic;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProfileField, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
