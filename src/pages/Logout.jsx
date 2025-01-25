import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("https://gross-vina-final-hackathon-smit-633a1bb1.koyeb.app/api/users/logout");
      console.log(response);

      
      localStorage.removeItem("userId");
      localStorage.removeItem("imageUrl");
      
      
     

      alert('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default Logout;
