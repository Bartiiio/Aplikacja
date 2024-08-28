import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editPokoj, getAllPokoje, Pokoj } from "../services/apiPokoje";
import toast from "react-hot-toast";

export function usePokoje() {
   const {
      isLoading,
      data: pokoje,
      error,
   } = useQuery({
      queryKey: ["pokoje"],
      queryFn: getAllPokoje,
   });
   return { isLoading, pokoje, error };
}

export function useEditPokojFN() {
   const queryClient = useQueryClient();

   const { mutate: EditPokoj } = useMutation({
      mutationFn: (data: Pokoj) => editPokoj(data),
      onSuccess: () => {
         toast.success("Pokój został pomyślnie zaktualizowany");
         queryClient.invalidateQueries({ queryKey: ["pokoje"] });
      },
      onError: () => {
         toast.error("Wystąpił błąd podczas aktualizacji pokoju");
      },
   });

   return { EditPokoj };
}
