import connection from "../db.js";

export const logout = (req, res) => {
   try {
      req.session.destroy((err) => {
         if (err) {
            console.error("Failed to destroy session:", err);
            return res.status(500).json({ error: "Failed to logout" });
         }
         res.clearCookie("connect.sid");
         res.status(200).json({ message: "Logged out successfully" });
      });
   } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "An error occurred while logging out" });
   }
};
