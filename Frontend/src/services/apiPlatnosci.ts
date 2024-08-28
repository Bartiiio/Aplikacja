import axios from "axios";

export interface Platnosc {
   idplatnosci: number;
   cena_za_pokoj: number;
   cena_za_sniadanie: number;
   suma: number;
   czy_oplacono: string | number;
   zaliczka: number;
   doby: number;
}

export async function getPlatnosci(): Promise<Platnosc[]> {
   try {
      const response = await axios.get<Platnosc[]>(
         "http://127.0.0.1:3000/api/v1/platnosci"
      );

      return response.data;
   } catch (error) {
      console.error("Błąd przy pobieraniu płatności...", error);
      throw error;
   }
}

export async function updatePlatnosc(data: Platnosc) {
   const { idplatnosci, ...restOfData } = data;

   try {
      const response = await axios.put(
         `http://127.0.0.1:3000/api/v1/edytuj-platnosc/${idplatnosci}`,
         restOfData
      );
      return response.data;
   } catch (error) {
      console.error("Błąd przy edytowaniu płatności...", error);
      throw error;
   }
}
