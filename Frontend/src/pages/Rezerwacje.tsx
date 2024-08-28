import { FC, useState } from "react";
import Modal from "../ui/Modal";
import { Rezerwacja } from "../services/apiRezerwacje";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../style/tablestyle.css";
import {
   useAddRezerwacja,
   useDeleteRezerwacja,
   useEditRezerwacja,
   useRezerwacje,
} from "../hooks/useRezerwacje";
import { convertToDateFormat, formatDate } from "../utils/formatDate";
import { formatPhoneNumber } from "../utils/formatNumber";
import { MdModeEdit } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { usePokoje } from "../hooks/usePokoje";

const defaultValues = {
   id: 0,
   nrPokoju: 0,
   odKiedy: "",
   doKiedy: "",
   iloscOsob: 0,
   sniadanie: "nie",
   wynajmujacy: "",
   numerKontaktowy: "",
};

const Rezerwacje: FC = () => {
   const { rezerwacje = [] } = useRezerwacje();
   const { mutate } = useDeleteRezerwacja();
   const { mutate: editRezerwacjaApi } = useEditRezerwacja();
   const { mutate: dodajrezerwacje } = useAddRezerwacja();
   const { pokoje = [] } = usePokoje();

   const [currentItem, setCurrentItem] = useState<Rezerwacja | null>(null);
   const [open, setOpen] = useState(false);

   const { control, handleSubmit, reset } = useForm<Rezerwacja>({
      defaultValues: currentItem || defaultValues,
   });

   const handleEditReserwation = (rezerwacja: Rezerwacja) => {
      const copyrezerwazja: Rezerwacja = {
         ...rezerwacja,
         odKiedy: convertToDateFormat(rezerwacja.odKiedy),
         doKiedy: convertToDateFormat(rezerwacja.doKiedy),
         sniadanie: rezerwacja.sniadanie == 0 ? "nie" : "tak",
      };
      setCurrentItem(copyrezerwazja);
      reset(copyrezerwazja);
      setOpen(true);
   };

   const editRezerwacjaSubmit = (data: Rezerwacja) => {
      editRezerwacjaApi(data);
      reset(defaultValues);
      setOpen(false);
   };

   const onSubmit = (data: Rezerwacja) => {
      const nowaOdKiedy = new Date(data.odKiedy).toISOString();
      const nowaDoKiedy = new Date(data.doKiedy).toISOString();

      const czyPokójZajęty = rezerwacje.some((rezerwacja) => {
         const istniejącaOdKiedy = new Date(rezerwacja.odKiedy).toISOString();
         const istniejącaDoKiedy = new Date(rezerwacja.doKiedy).toISOString();

         const czyNakładająceSię =
            rezerwacja.nrPokoju === data.nrPokoju &&
            nowaOdKiedy < istniejącaDoKiedy &&
            nowaDoKiedy > istniejącaOdKiedy;

         return czyNakładająceSię;
      });

      if (czyPokójZajęty) {
         toast.error("Wybrany pokój jest zajęty w podanym terminie.");
         reset(defaultValues);
         setOpen(false);
         return;
      }

      const pokojCena = pokoje?.find(
         (pokoj) => pokoj.nrPokoju === data.nrPokoju
      );

      const finalData = { ...data, cena_za_pokoj: pokojCena?.cena?.toString() };

      dodajrezerwacje(finalData);
      setOpen(false);
   };

   const handleCancel = () => {
      if (currentItem) {
         reset(currentItem);
      }
      setOpen(false);
   };

   const handleDelete = (id: number) => {
      if (!id) return;
      mutate(id);
      setOpen(false);
   };

   const handleAddReserwation = () => {
      setCurrentItem(defaultValues);
      reset(defaultValues);
      setOpen(true);
   };

   return (
      <>
         {currentItem ? (
            <Modal open={open} onClose={handleCancel}>
               <form
                  onSubmit={
                     currentItem.id === 0
                        ? handleSubmit(onSubmit)
                        : handleSubmit(editRezerwacjaSubmit)
                  }
                  className="h-[550px] w-[300px]"
               >
                  {currentItem.id !== 0 && (
                     <div className="flex p-2 text-base">
                        <p className="leading-10">ID:</p>
                        <Controller
                           name="id"
                           control={control}
                           render={({ field }) => (
                              <input
                                 {...field}
                                 className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                                 type="number"
                                 disabled
                              />
                           )}
                        />
                     </div>
                  )}

                  <div className="flex p-2 text-base">
                     <p className="leading-10">Pokój:</p>
                     <Controller
                        name="nrPokoju"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                              type="number"
                              min={1}
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Od kiedy:</p>
                     <Controller
                        name="odKiedy"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                              type="date"
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Do kiedy:</p>
                     <Controller
                        name="doKiedy"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                              type="date"
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Ilość osób:</p>
                     <Controller
                        name="iloscOsob"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                              type="number"
                              min={1}
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Śniadanie:</p>
                     <Controller
                        name="sniadanie"
                        control={control}
                        render={({ field }) => (
                           <select
                              {...field}
                              className="bg-gray-400 p-2 ml-2 rounded-lg w-[175px]"
                              required
                           >
                              <option value="tak">Tak</option>
                              <option value="nie">Nie</option>
                           </select>
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Wynajmujący:</p>
                     <Controller
                        name="wynajmujacy"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2  p-2 bg-gray-400 rounded-lg w-[175px]"
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-base">
                     <p className="leading-10">Telefon:</p>
                     <Controller
                        name="numerKontaktowy"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 p-2 bg-gray-400 rounded-lg w-[175px]"
                              type="tel"
                              required
                           />
                        )}
                     />
                  </div>
                  <div className="mt-6 p-4 flex flex-row justify-center items-center">
                     <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 w-[80px] text-white font-bold py-2 px-1 rounded"
                     >
                        {currentItem.id === 0 ? "Dodaj" : "Zapisz"}
                     </button>
                     {currentItem.id !== 0 && (
                        <button
                           onClick={() => handleDelete(currentItem.id)}
                           type="button"
                           className="bg-red-600 hover:bg-red-500 w-[80px] ml-4 text-white font-bold py-2 px-1 rounded"
                        >
                           Usuń!
                        </button>
                     )}

                     <button
                        onClick={() => handleCancel()}
                        type="reset"
                        className="bg-red-600 hover:bg-red-500 ml-4 text-white font-bold w-[80px] py-2 px-1 rounded"
                     >
                        Anuluj!
                     </button>
                  </div>
               </form>
            </Modal>
         ) : (
            ""
         )}
         <div className=" flex flex-col">
            <div className=" flex flex-row items-center justify-between p-3">
               <h1 className="text-gray-200 text-xl md:text-4xl p-4 md:p-8 font-serif">
                  Lista rezerwacji
               </h1>
               <div>
                  <button
                     onClick={() => handleAddReserwation()}
                     className=" mr-5 text-sm md:text-xl text-gray-200 font-bold bg-green-700 p-3 rounded-lg font-serif hover:scale-105"
                  >
                     Dodaj rezerwacje
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto p-4">
               <Table className="min-w-full text-white border border-gray-700">
                  <Thead>
                     <Tr className="bg-neutral-900">
                        <Th className="border-b border-gray-400 p-2 text-left">
                           ID
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Wynajmujący
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Od kiedy
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Do kiedy
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Nr pokoju
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Ilość osób
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Numer kontaktowy
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Śniadanie
                        </Th>
                        <Th className="border-b border-gray-400 p-2 text-left">
                           Edytuj
                        </Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {rezerwacje.map((rezerwacja) => {
                        const isSniadanie = rezerwacja.sniadanie == "1";
                        const isPastReservation =
                           new Date(rezerwacja.doKiedy) <
                           new Date(new Date().setHours(0, 0, 0, 0));

                        return (
                           <Tr
                              key={rezerwacja.id}
                              className="bg-neutral-700 hover:bg-neutral-500"
                           >
                              <Td className="border-b border-gray-400 p-2">
                                 {rezerwacja.id}
                              </Td>
                              <Td className="border-b border-gray-400 p-2">
                                 {rezerwacja.wynajmujacy}
                              </Td>
                              <Td
                                 className={`border-b border-gray-400 p-2 ${
                                    isPastReservation ? "text-red-500" : ""
                                 }`}
                              >
                                 {formatDate(rezerwacja.odKiedy)}
                              </Td>
                              <Td
                                 className={`border-b border-gray-400 p-2 ${
                                    isPastReservation ? "text-red-500" : ""
                                 }`}
                              >
                                 {formatDate(rezerwacja.doKiedy)}
                              </Td>
                              <Td className="border-b border-gray-400 p-2">
                                 {rezerwacja.nrPokoju}
                              </Td>
                              <Td className="border-b border-gray-400 p-2">
                                 {rezerwacja.iloscOsob}
                              </Td>
                              <Td className="border-b border-gray-400 p-2">
                                 {formatPhoneNumber(rezerwacja.numerKontaktowy)}
                              </Td>
                              <Td
                                 className={`border-b border-gray-400 p-2 ${
                                    isSniadanie
                                       ? "text-green-500"
                                       : "text-red-500"
                                 }`}
                              >
                                 {isSniadanie ? "Tak" : "Nie"}
                              </Td>
                              <Td className="border-b border-gray-400 p-2">
                                 <MdModeEdit
                                    onClick={() =>
                                       handleEditReserwation(rezerwacja)
                                    }
                                    className="text-3xl m-2 bg-neutral-500 w-[30px] h-[30px] rounded-lg cursor-pointer hover:scale-110 hover:bg-neutral-300"
                                 />
                              </Td>
                           </Tr>
                        );
                     })}
                  </Tbody>
               </Table>
            </div>
         </div>
      </>
   );
};

export default Rezerwacje;
