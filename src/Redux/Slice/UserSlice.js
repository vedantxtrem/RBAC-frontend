import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  userData: [],
  userOne: {}, // Single user data
  loading: false, // Track loading state
  error: null,    // Track errors
};

// Fetch all user data
export const getUserData = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user"); 
      toast.success("User data fetched successfully");
      return data; 
    } catch (error) {
      toast.error(error?.message || "Failed to fetch user data");
      return rejectWithValue(error?.response?.data || "Unknown error occurred");
    }
  }
);

export const useUpload = createAsyncThunk("uploadImage", async (data) => {
  try {
      const res =  axiosInstance.post("/user/upload",{
        image : data
      })
      toast.promise(url,{
        loading : "uploading",
        success : "upload succfully",
        error : "failed to upload",
      })
      return (await res).data;
  } catch (error) {
      toast.error(error.message);
  }
})

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload?.data || [];
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      });
  },
});

export default UserSlice.reducer;
