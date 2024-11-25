import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpload } from "../Redux/Slice/UserSlice";

const AddUserModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    photo: "",
    skills: "",
  });

  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload and preview
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

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(formData);

    const data = formData.photo
    const url = await dispatch(useUpload(data));
    console.log("res",url);
    
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-amber-50 p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center whitespace-nowrap "> Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col justify-center items-center">
          {/* Photo Upload */}
          <div className="w-28 h-28 rounded-full">
            <label htmlFor="photo" className="cursor-pointer w-full mb-2 text-center ">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="User Preview"
                  className="w-full h-full  object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full  flex items-center justify-center border border-  ">
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
          />

          

          {/* Action buttons */}
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
