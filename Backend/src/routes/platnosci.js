import connection from "../db.js";

export const getPlatnosci = (req, res) => {
   const query = "SELECT * FROM platnosci";

   connection.query(query, (error, results) => {
      if (error) {
         console.error("Błąd zapytania do bazy danych:", error);

         return res
            .status(500)
            .json({ error: "Wystąpił błąd podczas pobierania danych" });
      }

      res.status(200).json(results);
   });
};

export const updatePlatnosci = (req, res) => {
   const { id } = req.params;
   const { zaliczka, czy_oplacono } = req.body;

   if (zaliczka === undefined || czy_oplacono === undefined) {
      return res
         .status(400)
         .json({ error: "Brakuje wymagających danych do aktualizacji" });
   }

   const query = `
      UPDATE platnosci
      SET zaliczka = ?, czy_oplacono = ?
      WHERE idplatnosci = ?
   `;

   connection.query(query, [zaliczka, czy_oplacono, id], (error, results) => {
      if (error) {
         console.error("Błąd zapytania do bazy danych:", error);

         return res
            .status(500)
            .json({ error: "Wystąpił błąd podczas aktualizacji danych" });
      }

      if (results.affectedRows === 0) {
         return res
            .status(404)
            .json({ error: "Nie znaleziono rekordu do zaktualizowania" });
      }

      res.status(200).json({
         message: "Dane zostały pomyślnie zaktualizowane",
      });
   });
};
