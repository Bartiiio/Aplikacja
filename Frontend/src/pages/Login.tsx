import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

export interface LoginFormInputs {
   username: string;
   password: string;
}

const Login = () => {
   const { login } = useLogin();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormInputs>();

   const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
      login(data);
   };

   return (
      <div className="w-[100vw] h-[100vh] bg-gray-900 flex justify-center items-center p-2">
         <div className="bg-gray-700 w-[350px] h-[400px] rounded-xl">
            <p className="text-center text-white p-3 mt-4 font-serif text-3xl">
               Zaloguj się!
            </p>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex flex-col justify-center items-center"
            >
               <div className="p-3">
                  <input
                     type="text"
                     placeholder="Nazwa użytkownika"
                     className="p-3 rounded-lg"
                     {...register("username", {
                        required: "Nazwa użytkownika jest wymagana",
                     })}
                  />
                  {errors.username && (
                     <p className="text-red-500 text-xs">
                        {errors.username.message}
                     </p>
                  )}
               </div>
               <div className="p-3">
                  <input
                     type="password"
                     placeholder="Hasło"
                     className="p-3 rounded-lg"
                     {...register("password", {
                        required: "Hasło jest wymagane",
                     })}
                  />
                  {errors.password && (
                     <p className="text-red-500 text-xs">
                        {errors.password.message}
                     </p>
                  )}
               </div>
               <button
                  type="submit"
                  className="bg-gray-500 p-4 w-40 rounded-lg mt-12 hover:scale-110 hover:font-bold"
               >
                  Zaloguj!
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
