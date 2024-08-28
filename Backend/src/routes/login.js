import connection from "../db.js";

export const login = async (req, res) => {
   try {
      const { username, password } = req.body;

      const [rows] = await connection
         .promise()
         .query(
            "SELECT * FROM pracownicy WHERE username = ? AND password = ?",
            [username, password]
         );

      if (rows.length === 0) {
         return res.status(401).json({ error: "Nieprawidłowe dane logowania" });
      }

      const user = rows[0];

      req.session.username = username;
      req.session.password = password;
      req.session.loggedIn = true;

      res.status(200).json({
         message: "Zalogowano pomyślnie",
      });
   } catch (error) {
      console.error("Błąd logowania:", error);
      res.status(500).json({ error: "Wystąpił błąd podczas logowania" });
   }
};
