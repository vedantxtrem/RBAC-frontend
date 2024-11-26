import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  userData: [],
  userOne: null,
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
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id) => {
    try {
      const data = await axiosInstance.get(`/user/${id}`);
      toast.success("User data fetched successfully");
      console.log(data);

      return data;
    } catch (error) {
      toast.error(error?.message || "Failed to fetch user data");
      return rejectWithValue(error?.response?.data || "Unknown error occurred");
    }
  }
);
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/user/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Unknown error occurred");
    }
  }
);

export const useUpdatePermission = createAsyncThunk(
  "user/updatepermission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("Calling API with data:", data);

      const res = await axiosInstance.put(`/user/permission/${id}`, data);
      toast.success("Permission updated successfully");

      return res.data; // Ensure you return only the needed data
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update permissions";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



export const useUpload = createAsyncThunk("uploadImage", async (upload) => {
  try {
    const res = await axiosInstance.post("/user/upload", {
      image: upload
    })
    // toast.promise(url,{
    //   loading : "uploading",
    //   success : "upload succfully",
    //   error : "failed to upload",
    // })
    // return (await res).data;
    if (!res) {
      return;
    }

    return res;
  } catch (error) {
    toast.error(error.message);
  }
})

export const useAddUser = createAsyncThunk("addUser", async (data) => {
  try {
    const response = axiosInstance.post("/user", data);

    toast.promise(response, {
      loading: "Adding User",
      success: "sucess",
      error: "failed to add user",
    })

    return (await response)
  } catch (error) {
    toast.error(error.message);
  }
})

export const useDeleteUser = createAsyncThunk("delete", async (id) => {
  try {
    const res = axiosInstance.delete(`/user/${id}`);
    toast.promise(res, {
      loading: "removing user",
      loading: (res) => res?.payload?.data,
      error: "error on removing"
    })
    console.log(res);

    return (await res)
  } catch (e) {
    toast.error(e.message);
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
      })
      .addCase(useUpload.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload?.data);
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userOne = action.payload?.data || null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      })
      .addCase(useUpdatePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.userOne = action.payload?.data || null;
      })
  },
});

export default UserSlice.reducer;
