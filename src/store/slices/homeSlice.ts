import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../../constants/url";


// Define the profile type
interface HomeState {
  fullName: string;
  roomNo: string;
  roomType: string
}

// Initial state
const initialState: HomeState = {
  fullName: "",
  roomNo: "",
  roomType: ""
};

// Async thunk to fetch home
export const fetchHome = createAsyncThunk(
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeField: (
      state,
      action: PayloadAction<{ key: keyof HomeState; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearHome: (state) => {
      state.fullName = "";
      state.roomNo = "";
      state.roomType ="";
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchHome.fulfilled, (state, action: PayloadAction<any>) => {
        state.fullName = action.payload.fullName;
       state.roomNo = action.payload.roomNo;
       state.roomType = action.payload.roomType;
      })
      
  },
});

export const { setHomeField, clearHome } = homeSlice.actions;
export default homeSlice.reducer;
