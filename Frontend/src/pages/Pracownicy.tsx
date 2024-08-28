import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PracownicyTabela from "../ui/PracownicyTabela";
import Modal from "../ui/Modal";
import { useAddPracownik } from "../hooks/usePracownicy";

interface Pracownik {
   imie: string;
   nazwisko: string;
   username: string;
   password: string;
   stanowisko: string;
   nrtelefonu: string;
}

const Pracownicy: FC = () => {
   const [open, setOpen] = useState(false);
   const { pracownik } = useAddPracownik();

   const handleAdd = () => {
      setOpen(true);
   };

   const handleCancel = () => {
      reset();
      setOpen(false);
   };

   const onSubmit = (data: Pracownik) => {
      pracownik(data);
      reset();
      setOpen(false);
   };

   const { control, handleSubmit, reset } = useForm<Pracownik>({
      defaultValues: {
         imie: "",
         nazwisko: "",
         username: "",
         password: "",
         stanowisko: "",
         nrtelefonu: "",
      },
   });

   return (
      <>
         <Modal open={open} onClose={handleCancel}>
            <div className="p-4 h-[600px] w-[300px]">
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col mb-4">
                     <label htmlFor="imie" className="text-xl">
                        Imię:
                     </label>
                     <Controller
                        name="imie"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="imie"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                           />
                        )}
                     />
                  </div>

                  <div className="flex flex-col mb-4">
                     <label htmlFor="nazwisko" className="text-xl">
                        Nazwisko:
                     </label>
                     <Controller
                        name="nazwisko"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="nazwisko"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                           />
                        )}
                     />
                  </div>

                  <div className="flex flex-col mb-4">
                     <label htmlFor="username" className="text-xl">
                        Nazwa użytkownika:
                     </label>
                     <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="username"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                           />
                        )}
                     />
                  </div>

                  <div className="flex flex-col mb-4">
                     <label htmlFor="password" className="text-xl">
                        Hasło:
                     </label>
                     <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="password"
                              type="password"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                           />
                        )}
                     />
                  </div>

                  <div className="flex flex-col mb-4">
                     <label htmlFor="stanowisko" className="text-xl">
                        Stanowisko:
                     </label>
                     <Controller
                        name="stanowisko"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="stanowisko"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                           />
                        )}
                     />
                  </div>

                  <div className="flex flex-col mb-4">
                     <label htmlFor="nrtelefonu" className="text-xl">
                        Numer telefonu:
                     </label>
                     <Controller
                        name="nrtelefonu"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              id="nrtelefonu"
                              className="p-2 bg-gray-700 text-white rounded-lg"
                              required={true}
                              type="number"
                           />
                        )}
                     />
                  </div>

                  <div className="flex justify-center space-x-4 p-4 pt-8">
                     <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                     >
                        Zapisz
                     </button>
                     <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                     >
                        Anuluj
                     </button>
                  </div>
               </form>
            </div>
         </Modal>

         <div className="p-4">
            <div className="text-xl md:text-4xl p-4 m-2 text-gray-200 font-serif font-bold flex justify-between items-center">
               Lista pracowników
               <button
                  onClick={handleAdd}
                  className="text-sm md:text-xl bg-neutral-700 p-3 rounded-lg font-serif hover:scale-105"
               >
                  Dodaj pracownika
               </button>
            </div>
            <PracownicyTabela />
         </div>
      </>
   );
};

export default Pracownicy;
