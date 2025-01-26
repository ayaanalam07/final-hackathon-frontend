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
      const response = await axios.post("https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/users/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering user:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center mt-5 p-5">
      <form
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
        className="p-8 w-full max-w-md bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg font-bold p-2 mb-5">Register</h1>

        <input
          className="input input-bordered w-full mb-3"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <input
          className="input input-bordered w-full mb-3"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          className="input input-bordered w-full mb-3"
          type="text"
          name="CNIC"
          value={formData.CNIC}
          onChange={handleChange}
          placeholder="CNIC (e.g., 12345-1234567-1)"
          required
        />

        <button className="btn bg-info hover:bg-info w-full text-lg text-white" type="submit">
          Register
        </button>

        {message && <p className="text-center mt-3 text-blue-500">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
