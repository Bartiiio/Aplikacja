import axios from "axios";

export interface Pracownik {
   id?: number;
   imie: string;
   nazwisko: string;
   stanowisko: string;
   nrtelefonu: string;
}

export async function getAllPracownicy(): Promise<Pracownik[]> {
   try {
      const response = await axios.get<Pracownik[]>(
         "http://127.0.0.1:3000/api/v1/pracownicy"
      );

      return response.data;
   } catch (error) {
      console.error("Failed to fetch employees:", error);
      throw error;
   }
}

export async function addPracownik(pracownik: Pracownik): Promise<void> {
   try {
      await axios.post("http://127.0.0.1:3000/api/v1/pracownicy", pracownik, {
         headers: {
            "Content-Type": "application/json",
         },
      });
   } catch (error) {
      console.error("Failed to add employee:", error);
      throw error;
   }
}
