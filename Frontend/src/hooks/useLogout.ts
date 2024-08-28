import { useMutation } from "@tanstack/react-query";
import apiLogout from "../services/apiLogout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogout() {
   const navigate = useNavigate();

   const { mutate: logout } = useMutation({
      mutationFn: apiLogout,
      onSuccess: () => {
         navigate("/login");
         toast.success("Wylogowano pomyślnie");
      },
      onError: (err) => {
         console.log("ERROR", err);
         toast.error("Failed to logout");
      },
   });

   return { logout };
}
