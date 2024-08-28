import mysql from "mysql2";

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "hotel",
});

connection.connect((err) => {
   if (err) {
      console.error("Błąd połączenia z bazą danych:", err);
      return;
   }
   console.log("Połączono z bazą danych MySQL.");
});

export default connection;
