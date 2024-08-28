import connection from "../db.js";

export const getAllPracownicy = (req, res) => {
   const query = `
      SELECT id, imie, nazwisko, stanowisko, nrtelefonu
      FROM hotel.pracownicy
   `;

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

export const addPracownik = (req, res) => {
   const { imie, nazwisko, username, password, stanowisko, nrtelefonu } =
      req.body;

   if (
      !imie ||
      !nazwisko ||
      !username ||
      !password ||
      !stanowisko ||
      !nrtelefonu
   ) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane." });
   }

   const checkUserQuery = `
      SELECT * FROM hotel.pracownicy WHERE username = ?
   `;

   connection.query(checkUserQuery, [username], (checkError, checkResults) => {
      if (checkError) {
         console.error("Błąd zapytania do bazy danych:", checkError);
         return res
            .status(500)
            .json({ error: "Wystąpił błąd podczas sprawdzania użytkownika." });
      }

      if (checkResults.length > 0) {
         return res
            .status(400)
            .json({
               error: "Użytkownik o podanej nazwie użytkownika już istnieje.",
            });
      }

      const insertQuery = `
         INSERT INTO hotel.pracownicy (imie, nazwisko, username, password, stanowisko, nrtelefonu)
         VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
         imie,
         nazwisko,
         username,
         password,
         stanowisko,
         nrtelefonu,
      ];

      connection.query(insertQuery, values, (insertError, insertResults) => {
         if (insertError) {
            console.error("Błąd podczas dodawania pracownika:", insertError);
            return res
               .status(500)
               .json({ error: "Wystąpił błąd podczas dodawania pracownika." });
         }

         res.status(201).json({
            message: "Pracownik został pomyślnie dodany.",
         });
      });
   });
};
