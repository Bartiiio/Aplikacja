import axios from "axios";
import { LoginFormInputs } from "../pages/Login";

const apiLogin = async (data: LoginFormInputs) => {
   try {
      const url = `http://127.0.0.1:3000/api/v1/login`;
      const response = await axios.post(url, data, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });

      return response.data;
   } catch (error) {
      console.error("Failed to login:", error);
      throw error;
   }
};

export default apiLogin;
