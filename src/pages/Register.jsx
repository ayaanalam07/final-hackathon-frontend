import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submissions = async (data) => {
    const formData = new FormData();
    formData.append("username", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        "https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const userId = response.data.data._id;
      const image = response.data.data.image;

      localStorage.setItem("userId", userId);
      localStorage.setItem("imageUrl", image);

      setUserDetails({
        name: data.name,
        email: data.email,
        image: image,
      });

      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Redirect to login
  };

  return (
    <>
      <div className="flex justify-center mt-5 p-5">
        <form
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
          className="p-8 w-full max-w-md bg-white rounded-lg"
          onSubmit={handleSubmit(submissions)}
        >
          <h1 className="text-lg font-bold p-2 mb-5">Register</h1>
          <input
            className="input input-bordered w-full mb-3"
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Username"
          />
          {errors.name && <p className="text-red-500 mb-2 text-start mx-1">{errors.name.message}</p>}

          <input
            className="input input-bordered w-full mb-3"
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 mb-2 text-start mx-1">{errors.email.message}</p>}

          <input
            className="input input-bordered w-full mb-3"
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-start mx-1 mb-2">{errors.password.message}</p>}

          <input
            className="file-input file-input-bordered file-input-info w-full mb-3"
            {...register("image", { required: "Image is required" })}
            type="file"
          />
          {errors.image && <p className="text-red-500 text-start mb-2 mx-1">{errors.image.message}</p>}

          <button className="btn bg-info hover:bg-info w-full text-lg text-white" type="submit">
            Submit
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-center text-green-600">
              Registration Successful!
            </h2>
            <div className="flex flex-col items-center">
              {userDetails?.image && (
                <img
                  src={userDetails.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4 border"
                />
              )}
              <p className="font-medium text-lg mb-1">Name: {userDetails?.name}</p>
              <p className="text-gray-600">Email: {userDetails?.email}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="btn bg-blue-500 hover:bg-blue-600 w-full mt-4 text-white"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
