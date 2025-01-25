import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [loading,setLoading] = useState(false)
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

    const login = async (data) => {
        try {
            setLoading(true)
          const response = await axios.post(
            "http://localhost:3000/api/users/login",
            data
          );
          reset();

          if (response.data && response.data.data){
            const { _id, image } = response.data.data;
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("userId", _id);
            localStorage.setItem("imageUrl", image);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            console.log("Logged in successfully:", response.data.data);
            setUserId(_id);
            setTimeout(() => {
              alert('Successfully logged in');
              navigate("/Dashboard");
            }, 1000);
            
          }else{
            console.error("userId is not returned in the response");
            alert("Failed to log in: userId not returned.");
          }
    
        }catch (error) {   
            if (error.response) {
              console.log("Error response data:", error.response.data); 
              if (error.response.status === 401) {
                if (error.response.data.message && error.response.data.message.includes("wrong email")) {
                  alert("Email is incorrect.");
                } 
                 if (error.response.data.message && error.response.data.message.includes("wrong password")) {
                  alert("Password is incorrect.");
                }
              }
            }
          }finally{
            setLoading(false)
          }
      };

  return (
    <>
    <div className="flex justify-center mt-5 p-5">
      <form
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
        className="p-8 w-full max-w-md bg-white rounded-lg"
        onSubmit={handleSubmit(login)}
      >
        <h1 className="text-lg font-bold p-2 mb-5">Login</h1>
       

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


        
        {
            loading ? <button className="btn bg-info hover:bg-info w-full text-lg text-white" type="submit">
            Loading...
          </button> : <button className="btn bg-info hover:bg-info w-full text-lg text-white" type="submit">
          Login
        </button>
        }
      </form>
    </div>
    </>
  )
}

export default Login
