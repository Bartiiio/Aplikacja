import { FC, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useEditPlatnosci, usePlatnosci } from "../hooks/usePlatnosci";
import { MdModeEdit } from "react-icons/md";
import formatCurrency from "../utils/FormatCurrency";
import { Controller, useForm } from "react-hook-form";
import Modal from "./Modal";
import { Platnosc } from "../services/apiPlatnosci";

const defaultValues = {
   idplatnosci: 0,
   cena_za_pokoj: 0,
   cena_za_sniadanie: 0,
   suma: 0,
   czy_oplacono: "nie",
   zaliczka: 0,
   doby: 0,
};

const PlatnosciTabela: FC = () => {
   const { platnosci = [] } = usePlatnosci();

   const { mutate: updatePlatnosci } = useEditPlatnosci();

   const [open, setOpen] = useState(false);

   const [currentItem, setCurrentItem] = useState<Platnosc | null>(null);

   const { control, handleSubmit, reset } = useForm<Platnosc>({
      defaultValues: currentItem || defaultValues,
   });

   const handleEditClick = (item: Platnosc) => {
      const data = { ...item };
      setCurrentItem(item);
      reset(data);
      setOpen(true);
   };

   const handleCancel = () => {
      if (currentItem) {
         reset(currentItem);
      }
      setOpen(false);
   };

   const onSubmit = (data: Platnosc) => {
      updatePlatnosci(data);

      setOpen(false);
   };

   return (
      <>
         <Modal open={open} onClose={handleCancel}>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="h-[500px] w-[300px]"
            >
               <div className="flex m-3 items-center text-xl">
                  <p className="leading-10">ID</p>
                  <Controller
                     name="idplatnosci"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className=" w-32 ml-2 p-2 bg-gray-400 rounded-lg"
                           type="number"
                           disabled
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Liczba dób: </p>
                  <Controller
                     name="doby"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className=" w-32 ml-2 p-2 bg-gray-400 rounded-lg"
                           type="number"
                           disabled
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Cena za pokój: </p>
                  <Controller
                     name="cena_za_pokoj"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className="ml-2 w-32 p-2 bg-gray-400 rounded-lg"
                           type="number"
                           disabled
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Śniadania: </p>
                  <Controller
                     name="cena_za_sniadanie"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className="ml-2 w-32 p-2 bg-gray-400 rounded-lg"
                           type="number"
                           disabled
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Zaliczka: </p>
                  <Controller
                     name="zaliczka"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className="ml-2 w-32 p-2 bg-gray-400 rounded-lg"
                           type="number"
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Suma: </p>
                  <Controller
                     name="suma"
                     control={control}
                     render={({ field }) => (
                        <input
                           {...field}
                           className="ml-2 w-32 p-2 bg-gray-400 rounded-lg"
                           type="number"
                           disabled
                        />
                     )}
                  />
               </div>
               <div className="flex p-2 text-xl">
                  <p className="leading-10">Status: </p>
                  <Controller
                     name="czy_oplacono"
                     control={control}
                     render={({ field }) => (
                        <select
                           {...field}
                           id="posprzatany"
                           className=" bg-gray-400 p-2 ml-2 rounded-lg"
                           value={field.value}
                           onChange={(e) =>
                              field.onChange(Number(e.target.value))
                           }
                        >
                           <option value={1}>Opłacono</option>
                           <option value={0}>Brak płatności</option>
                        </select>
                     )}
                  />
               </div>
               <div className="mt-10 p-4 flex flex-row justify-center items-center">
                  <button
                     type="submit"
                     className="bg-green-600 hover:bg-green-500 mr-16 text-white font-bold py-2 px-4 rounded"
                  >
                     Zapisz
                  </button>
                  <button
                     onClick={() => handleCancel()}
                     type="reset"
                     className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                     Anuluj
                  </button>
               </div>
            </form>
         </Modal>
         <div className="overflow-x-auto p-4">
            <Table className="min-w-full text-white border border-gray-700">
               <Thead>
                  <Tr className="bg-neutral-900">
                     <Th className="border-b border-gray-400 p-2 text-left">
                        ID
                     </Th>

                     <Th className="border-b border-gray-400 p-2 text-left">
                        Liczba dób
                     </Th>
                     <Th className="border-b border-gray-400 p-2 text-left">
                        Opłata za pokój
                     </Th>
                     <Th className="border-b border-gray-400 p-2 text-left">
                        Opłata za śniadania
                     </Th>
                     <Th className="border-b border-gray-400 p-2 text-left">
                        Zaliczka
                     </Th>
                     <Th className="border-b border-gray-400 p-2 text-left">
                        Suma
                     </Th>
                     <Th className="border-b border-gray-400 p-2 text-left">
                        Status płatnosci
                     </Th>

                     <Th className="border-b border-gray-400 p-2 text-left">
                        Edytuj
                     </Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {platnosci.map((platnosc) => {
                     const suma = (platnosc.suma - platnosc.zaliczka).toFixed(
                        2
                     );

                     return (
                        <Tr
                           key={platnosc.idplatnosci}
                           className="bg-neutral-700 hover:bg-neutral-500"
                        >
                           <Td className="border-b border-gray-400 p-2">
                              {platnosc.idplatnosci}
                           </Td>
                           <Td className="border-b border-gray-400 p-2">
                              {platnosc.doby}
                           </Td>
                           <Td className="border-b border-gray-400 p-2">
                              {formatCurrency(platnosc.cena_za_pokoj)}
                           </Td>
                           <Td className="border-b border-gray-400 p-2">
                              {formatCurrency(platnosc.cena_za_sniadanie)}
                           </Td>
                           <Td className={`border-b border-gray-400 p-2 `}>
                              {formatCurrency(platnosc.zaliczka)}
                           </Td>
                           <Td className={`border-b border-gray-400 p-2`}>
                              {formatCurrency(suma)}
                           </Td>
                           <Td className="border-b border-gray-400 p-2">
                              <span
                                 className={`${
                                    platnosc.czy_oplacono === 0
                                       ? "text-red-500"
                                       : "text-green-500"
                                 }`}
                              >
                                 {platnosc.czy_oplacono === 0
                                    ? "Brak płatności"
                                    : "Opłacono"}
                              </span>
                           </Td>
                           <Td className="border-b border-gray-400 p-2">
                              <MdModeEdit
                                 onClick={() => {
                                    handleEditClick(platnosc);
                                 }}
                                 className="text-3xl m-2 bg-neutral-500 w-[30px] h-[30px] rounded-lg cursor-pointer hover:scale-110 hover:bg-neutral-300"
                              />
                           </Td>
                        </Tr>
                     );
                  })}
               </Tbody>
            </Table>
         </div>
      </>
   );
};

export default PlatnosciTabela;
