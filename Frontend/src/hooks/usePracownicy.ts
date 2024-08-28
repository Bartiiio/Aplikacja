import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
   addPracownik,
   getAllPracownicy,
   Pracownik,
} from "../services/apiPracownicy";
import toast from "react-hot-toast";

export function usePracownicy() {
   const { data: pracownicy } = useQuery({
      queryKey: ["pracownicy"],
      queryFn: getAllPracownicy,
   });
   return { pracownicy };
}

export function useAddPracownik() {
   const queryClient = useQueryClient();

   const { mutate: pracownik } = useMutation({
      mutationFn: (data: Pracownik) => addPracownik(data),
      onSuccess: () => {
         toast.success("Pracownik został dodany!");
         queryClient.invalidateQueries({ queryKey: ["pracownicy"] });
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            const errorMessage =
               error.response?.data?.error ||
               "Wystąpił błąd podczas dodawania pracownika!";
            toast.error(errorMessage);
         } else {
            toast.error("Wystąpił błąd podczas dodawania pracownika!");
         }
      },
   });

   return { pracownik };
}
