import connection from "../db.js";

export const getRezerwacje = (req, res) => {
   const query = "SELECT * FROM rezerwacje ORDER BY odKiedy ASC";

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

export const usunRezerwacje = (req, res) => {
   const { id } = req.body;

   try {
      if (!id) {
         return res.status(400).json({ error: "Brak ID w żądaniu" });
      }

      const result = connection.query("DELETE FROM rezerwacje WHERE id = ?", [
         id,
      ]);

      const result2 = connection.query(
         "DELETE FROM platnosci WHERE idplatnosci = ?",
         [id]
      );

      return res.status(200).json({ message: "Usunięto rezerwację" });
   } catch (error) {
      console.error("Błąd podczas usuwania rezerwacji:", error);
      return res
         .status(500)
         .json({ error: "Wystąpił błąd podczas usuwania rezerwacji" });
   }
};

export const addRezerwacje = (req, res) => {
   const {
      nrPokoju,
      odKiedy,
      doKiedy,
      iloscOsob,
      sniadanie,
      wynajmujacy,
      numerKontaktowy,
      cena_za_pokoj,
   } = req.body;

   try {
      if (
         !nrPokoju ||
         !odKiedy ||
         !doKiedy ||
         !iloscOsob ||
         !sniadanie ||
         !wynajmujacy ||
         !numerKontaktowy ||
         !cena_za_pokoj
      ) {
         return res.status(400).json({ error: "Wszystkie pola są wymagane" });
      }

      const sniadanieValue = sniadanie === "tak" ? 1 : 0;

      const result = connection.query(
         `INSERT INTO rezerwacje 
         (nrPokoju, odKiedy, doKiedy, iloscOsob, sniadanie, wynajmujacy, numerKontaktowy, cena_za_pokoj) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, //
         [
            nrPokoju,
            odKiedy,
            doKiedy,
            iloscOsob,
            sniadanieValue,
            wynajmujacy,
            numerKontaktowy,
            cena_za_pokoj,
         ]
      );

      return res.status(201).json({
         message: "Dodano nową rezerwację",
         rezerwacjaId: result.insertId,
      });
   } catch (error) {
      console.error("Błąd podczas dodawania rezerwacji:", error);
      return res
         .status(500)
         .json({ error: "Wystąpił błąd podczas dodawania rezerwacji" });
   }
};

export const editRezerwacja = (req, res) => {
   const { id } = req.params;
   const {
      nrPokoju,
      odKiedy,
      doKiedy,
      iloscOsob,
      sniadanie,
      wynajmujacy,
      numerKontaktowy,
   } = req.body;

   if (
      !nrPokoju ||
      !odKiedy ||
      !doKiedy ||
      !iloscOsob ||
      !sniadanie ||
      !wynajmujacy ||
      !numerKontaktowy
   ) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane" });
   }

   const sniadanieValue = sniadanie === "tak" ? 1 : 0;

   try {
      const result = connection.query(
         `UPDATE rezerwacje
          SET nrPokoju = ?, odKiedy = ?, doKiedy = ?, iloscOsob = ?, sniadanie = ?, wynajmujacy = ?, numerKontaktowy = ?
          WHERE id = ?`,
         [
            nrPokoju,
            odKiedy,
            doKiedy,
            iloscOsob,
            sniadanieValue,
            wynajmujacy,
            numerKontaktowy,
            id,
         ]
      );

      if (result.affectedRows === 0) {
         return res
            .status(404)
            .json({ error: "Rezerwacja nie została znaleziona" });
      }

      return res
         .status(200)
         .json({ message: "Rezerwacja została zaktualizowana" });
   } catch (error) {
      console.error("Błąd podczas edytowania rezerwacji:", error);
      return res
         .status(500)
         .json({ error: "Wystąpił błąd podczas edytowania rezerwacji" });
   }
};
