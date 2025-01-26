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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/users/register",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data?.message || error.message
      );
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
      <form
        className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Saylani Welfare Registration
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Register now and be a part of our welfare family.
        </p>

        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="CNIC"
          >
            CNIC
          </label>
          <input
            id="CNIC"
            name="CNIC"
            type="text"
            value={formData.CNIC}
            onChange={handleChange}
            placeholder="Enter CNIC (12345-1234567-1)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-blue-600 text-sm font-medium">
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-500 mt-6">
          Powered by{" "}
          <span className="font-bold text-blue-600">Saylani Welfare</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
