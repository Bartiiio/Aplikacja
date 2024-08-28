import { useMutation } from "@tanstack/react-query";

import apiLogin from "../services/apiLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoginFormInputs } from "../pages/Login";

export function useLogin() {
   const navigate = useNavigate();

   const { mutate: login } = useMutation({
      mutationFn: (data: LoginFormInputs) => apiLogin(data),
      onSuccess: () => {
         navigate("/pulpit");
      },
      onError: (err) => {
         console.log("ERROR", err);
         toast.error("Podane dane są nieprawidłowe");
      },
   });

   return { login };
}
