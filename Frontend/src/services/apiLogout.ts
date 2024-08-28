import axios from "axios";

const apiLogout = async () => {
   try {
      const url = `http://127.0.0.1:3000/api/v1/logout`;
      await axios.post(
         url,
         {},
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
   } catch (error) {
      console.error("Failed to logout:", error);
      throw error;
   }
};

export default apiLogout;
