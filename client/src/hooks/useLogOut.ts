import axios from "@/api/axios";
import { useNavigate } from "react-router";

const useLogOut = () => {
    
  const navigate = useNavigate();

    const logOut = async () => {
        try {
            const response = await axios.get('users/logout');   
            console.log(response);
            
    navigate("/sign-in", {
      state: { message: "You have logged out of your account!"},
    });
        } catch (error) {
            console.error(error);
        }
    }

  return logOut
}

export default useLogOut