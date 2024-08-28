import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   addRezerwacja,
   deleteRezerwacja,
   editRezerwacja,
   getAllRezerwacje,
   Rezerwacja,
} from "../services/apiRezerwacje";
import toast from "react-hot-toast";
import axios from "axios";

export function useRezerwacje() {
   const { data: rezerwacje } = useQuery({
      queryKey: ["rezerwacje"],
      queryFn: getAllRezerwacje,
   });
   return { rezerwacje };
}

export function useDeleteRezerwacja() {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (deleteRes: number) => deleteRezerwacja(deleteRes),

      onSuccess: () => {
         toast.success("Usunięto rezerwacje!");
         queryClient.invalidateQueries({ queryKey: ["rezerwacje"] });
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            const errorMessage =
               error.response?.data?.error ||
               "Wystąpił błąd podczas usuwania rezerwacji!";
            toast.error(errorMessage);
         } else {
            toast.error("Wystąpił błąd podczas usuwania rezerwacji!");
         }
      },
   });
   return { mutate: mutation.mutate };
}

export function useAddRezerwacja() {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (data: Rezerwacja) => addRezerwacja(data),

      onSuccess: () => {
         toast.success("Dodano nową rezerwację!");
         queryClient.invalidateQueries({ queryKey: ["rezerwacje"] });
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            const errorMessage =
               error.response?.data?.error ||
               "Wystąpił błąd podczas dodawania rezerwacji!";
            toast.error(errorMessage);
         } else {
            toast.error("Wystąpił błąd podczas dodawania rezerwacji!");
         }
      },
   });
   return { mutate: mutation.mutate };
}

export function useEditRezerwacja() {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (data: Rezerwacja) => {
         return editRezerwacja(data);
      },

      onSuccess: () => {
         toast.success("Rezerwacja została zaktualizowana!");
         queryClient.invalidateQueries({ queryKey: ["rezerwacje"] });
      },
      onError: (error: unknown) => {
         if (axios.isAxiosError(error)) {
            const errorMessage =
               error.response?.data?.error ||
               "Wystąpił błąd podczas edytowania rezerwacji!";
            toast.error(errorMessage);
         } else {
            toast.error("Wystąpił błąd podczas edytowania rezerwacji!");
         }
      },
   });

   return { mutate: mutation.mutate };
}
