import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserById, useUpload } from "../Redux/Slice/UserSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const EditProfileModal = ({ userData, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
    bio: "",
    photo: "",
    skills: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || "";

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "user",
        status: userData.status || "active",
        bio: userData.bio || "",
        photo: userData.photo || "",
        skills: Array.isArray(userData.skills) ? userData.skills.join(", ") : "",
      }));
    }
  }, [userData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: fileReader.result }));
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      toast.loading("Updating...");
  
      // Handle Image Upload
      let photoUrl = formData.photo;
      if (photoUrl && photoUrl.startsWith("data:image")) {
        const response = await dispatch(useUpload(photoUrl));
        photoUrl = response?.payload?.data?.url || photoUrl; // Fallback to original if upload fails
      }
  
      // Prepare Form Data
      const updatedData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        photo: photoUrl,
      };
  
      // Dispatch Update Action
      const res = await dispatch(updateUserById({ id, updatedData }));
      if (res.payload) {
        toast.success("Profile updated successfully!");
        onProfileUpdated();
        onClose();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      toast.dismiss();
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-amber-50 p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
          {/* Photo Upload */}
          <div className="w-28 h-28 rounded-full">
            <label htmlFor="photo" className="cursor-pointer w-full mb-2 text-center">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="User Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center border border-gray-300">
                  <span className="text-gray-400">Upload Photo</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />

          {/* Role Dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="subadmin">Sub-Admin</option>
          </select>

          {/* Status Dropdown */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Skills Input */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />

          {/* Bio Input */}
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            maxLength={500}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
