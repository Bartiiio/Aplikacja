import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   getPlatnosci,
   Platnosc,
   updatePlatnosc,
} from "../services/apiPlatnosci";
import axios from "axios";
import toast from "react-hot-toast";

export function usePlatnosci() {
   const { data: platnosci } = useQuery<Platnosc[]>({
      queryKey: ["platnosci"],
      queryFn: getPlatnosci,
   });

   return { platnosci };
}

export function useEditPlatnosci() {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (data: Platnosc) => updatePlatnosc(data),

      onSuccess: () => {
         toast.success("Płatność została zaktualizowana!");
         queryClient.invalidateQueries({ queryKey: ["platnosci"] });
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            const errorMessage =
               error.response?.data?.error ||
               "Wystąpił błąd podczas edytowania płatności!";
            toast.error(errorMessage);
         } else {
            toast.error("Wystąpił błąd podczas edytowania płatności!");
         }
      },
   });

   return { mutate: mutation.mutate };
}
