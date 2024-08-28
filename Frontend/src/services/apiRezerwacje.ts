import axios from "axios";

export interface Rezerwacja {
   id: number;
   dataRezerwacji?: string;
   nrPokoju: number;
   odKiedy: string;
   doKiedy: string;
   iloscOsob: number;
   sniadanie: string | number;
   wynajmujacy: string;
   numerKontaktowy: string;
   cena_za_pokoj?: string;
}

export async function getAllRezerwacje(): Promise<Rezerwacja[]> {
   try {
      const response = await axios.get<Rezerwacja[]>(
         "http://127.0.0.1:3000/api/v1/rezerwacje"
      );

      return response.data;
   } catch (error) {
      console.error("Błąd przy pobieraniu rezerwacji...", error);
      throw error;
   }
}

export async function deleteRezerwacja(id: number) {
   try {
      const response = await axios.delete(
         "http://127.0.0.1:3000/api/v1/rezerwacje/usun",
         { data: { id } }
      );
      return response.data;
   } catch (error) {
      console.error("Błąd przy usuwaniu rezerwacji...", error);
      throw error;
   }
}

export async function addRezerwacja(data: Rezerwacja) {
   try {
      const response = await axios.post(
         "http://127.0.0.1:3000/api/v1/nowa-rezerwacja",
         data
      );
      return response.data;
   } catch (error) {
      console.error("Błąd przy dodawaniu rezerwacji...", error);
      throw error;
   }
}

export async function editRezerwacja(data: Rezerwacja) {
   const { id, ...restOfData } = data;

   try {
      const response = await axios.put(
         `http://127.0.0.1:3000/api/v1/edytuj-rezerwacje/${id}`,
         restOfData
      );
      return response.data;
   } catch (error) {
      console.error("Błąd przy edytowaniu rezerwacji...", error);
      throw error;
   }
}
