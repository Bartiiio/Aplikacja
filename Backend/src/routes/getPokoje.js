import connection from "../db.js";

export const getAllPokoje = (req, res) => {
   const query = "SELECT * FROM pokoje";

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

export const updatePokoj = (req, res) => {
   const { id } = req.params;
   const { nrPokoju, maxOsob, cena, status, posprzatany, iloscLozek } =
      req.body;

   const posprzatanyNumber = Number(posprzatany);

   const query = `
        UPDATE pokoje 
        SET nrPokoju = ?, maxOsob = ?, cena = ?, status = ?, posprzatany = ?, iloscLozek = ?
        WHERE id = ?
    `;

   const values = [
      nrPokoju,
      maxOsob,
      cena,
      status,
      posprzatanyNumber,
      iloscLozek,
      id,
   ];

   connection.query(query, values, (error, results) => {
      if (error) {
         console.error("Błąd podczas aktualizacji pokoju:", error);
         return res
            .status(500)
            .json({ error: "Wystąpił błąd podczas aktualizacji danych" });
      }

      if (results.affectedRows === 0) {
         return res.status(404).json({ error: "Pokój nie został znaleziony" });
      }

      res.status(200).json({
         message: "Pokój został pomyślnie zaktualizowany",
      });
   });
};
