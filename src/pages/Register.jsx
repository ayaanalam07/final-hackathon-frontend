import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    CNIC: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { username, value } = e.target;
    setFormData({ ...formData, [username]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/users/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering user:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <form
      className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8 border-t-4 border-blue-500"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Saylani Welfare Registration
      </h1>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="CNIC">
          CNIC
        </label>
        <input
          id="CNIC"
          name="CNIC"
          type="text"
          value={formData.CNIC}
          onChange={handleChange}
          placeholder="Enter CNIC (12345-1234567-1)"
          className="input input-bordered w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <button
        className="w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
        type="submit"
      >
        Register
      </button>
  
      {message && (
        <p className="mt-4 text-center text-blue-500 text-sm font-medium">
          {message}
        </p>
      )}
  
      <p className="text-sm text-center text-gray-500 mt-6">
        Powered by <span className="font-bold text-blue-500">Saylani Welfare</span>
      </p>
    </form>
  </div>
    );
};

export default Register;
