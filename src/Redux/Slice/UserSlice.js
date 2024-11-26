import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import axios from "axios";

const initialState = {
  userData: [],
  userOne: null,
  loading: false,
  error: null,
};

export const getUserData = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user");
      toast.success("User data fetched successfully");
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to fetch user data";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/user/${id}`);
      toast.success("User details fetched successfully");
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to fetch user details";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/user/${id}`, updatedData);
      toast.success("User updated successfully");
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to update user details";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const useUpdatePermission = createAsyncThunk(
  "user/updatePermission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: updatedData } = await axiosInstance.put(`/user/permission/${id}`, data);
      toast.success("Permissions updated successfully");
      return updatedData;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update permissions";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const useUpload = createAsyncThunk(
  "user/uploadImage",
  async (upload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/upload/generate-presigned-url");

      const { url, upload_preset } = res.data;
      const formData = new FormData();

      formData.append("file", upload);
      formData.append("upload_preset", upload_preset);
      const { data } = await axios.put(url, formData);

      toast.success("Image uploaded successfully");

      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to upload image";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
export const useAddUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user", userData);
      toast.success("User added successfully");
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to add user";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const useDeleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/user/${id}`);
      toast.success("User deleted successfully");
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data || "Failed to delete user";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

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

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userOne = action.payload || null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user details";
      })

      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userOne = action.payload || null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user details";
      })

      .addCase(useUpdatePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.userOne = action.payload || null;
      })
      .addCase(useUpdatePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update permissions";
      })

      .addCase(useUpload.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(useUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload image";
      })

      .addCase(useAddUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(useAddUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add user";
      })

      .addCase(useDeleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(useDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default UserSlice.reducer;
