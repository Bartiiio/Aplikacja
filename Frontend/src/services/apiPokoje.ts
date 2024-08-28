import axios from "axios";

export interface Pokoj {
   id: number;
   nrPokoju: number;
   maxOsob: number;
   cena: number;
   status: string;
   posprzatany: number;
   iloscLozek: number;
}

export async function getAllPokoje(): Promise<Pokoj[]> {
   try {
      const response = await axios.get<Pokoj[]>(
         "http://127.0.0.1:3000/api/v1/pokoje"
      );
      return response.data;
   } catch (error) {
      console.error("Failed to fetch rooms:", error);
      throw error;
   }
}

export async function editPokoj(pokoj: Pokoj): Promise<void> {
   try {
      const url = `http://127.0.0.1:3000/api/v1/pokoje/${pokoj.id}`;
      await axios.put(url, pokoj, {
         headers: {
            "Content-Type": "application/json",
         },
      });
   } catch (error) {
      console.error("Failed to edit room:", error);
      throw error;
   }
}
