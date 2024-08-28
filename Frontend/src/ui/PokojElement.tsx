import { useEditPokojFN, usePokoje } from "../hooks/usePokoje";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { Pokoj } from "../services/apiPokoje";
import { Controller, useForm } from "react-hook-form";

function PokojElement() {
   const { pokoje, isLoading } = usePokoje();

   const { EditPokoj } = useEditPokojFN();

   const [open, setOpen] = useState(false);

   const [currentItem, setCurrentItem] = useState<Pokoj | null>(null);

   const handleEditClick = (item: Pokoj) => {
      setCurrentItem(item);
      setOpen(true);
   };

   const { control, handleSubmit, reset } = useForm<Pokoj>({
      defaultValues: currentItem || {
         cena: 0,
         iloscLozek: 0,
         maxOsob: 0,
         nrPokoju: 0,
         status: "",
         posprzatany: 0,
         id: 0,
      },
   });

   useEffect(() => {
      if (currentItem) {
         reset(currentItem);
      }
   }, [currentItem, reset]);

   const onSubmit = (data: Pokoj) => {
      EditPokoj(data);

      setOpen(false);
   };

   const handleCancel = () => {
      if (currentItem) {
         reset(currentItem);
      }
      setOpen(false);
   };

   return (
      <>
         {currentItem ? (
            <Modal open={open} onClose={handleCancel}>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-[500px] w-[300px]"
               >
                  <div className="flex m-3 items-center ">
                     <p className="font-serif text-2xl">Numer pokoju:</p>
                     <p className="ml-2 p-2 bg-gray-400 w-10 h-10 text-center rounded-full font-bold leading-5">
                        {currentItem.nrPokoju}
                     </p>
                  </div>
                  <div className="flex p-2 text-xl">
                     <p className="leading-10">Cena:</p>
                     <Controller
                        name="cena"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className=" w-32 ml-2 p-2 bg-gray-400 rounded-lg"
                              type="number"
                              min={100}
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-xl">
                     <p className="leading-10">Ilość łóżek: </p>
                     <Controller
                        name="iloscLozek"
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
                     <p className="leading-10">Maksymalna ilość gości:</p>
                     <Controller
                        name="maxOsob"
                        control={control}
                        render={({ field }) => (
                           <input
                              {...field}
                              className="ml-2 w-12 p-2 bg-gray-400 rounded-lg"
                              type="number"
                           />
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-xl">
                     <p className="leading-10">Status pokoju:</p>
                     <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                           <select
                              {...field}
                              className=" bg-gray-400 p-2 ml-2 rounded-lg"
                           >
                              <option value="Wolny">Wolny</option>
                              <option value="Zajęty">Zajęty</option>
                           </select>
                        )}
                     />
                  </div>
                  <div className="flex p-2 text-xl">
                     <p className="leading-10">Posprzątany:</p>
                     <Controller
                        name="posprzatany"
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
                              <option value={1}>Tak</option>
                              <option value={0}>Nie</option>
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
         ) : (
            ""
         )}

         <div className="flex flex-wrap justify-center">
            {isLoading
               ? ""
               : pokoje?.map((item) => (
                    <div
                       key={item.id}
                       className="bg-neutral-700 w-[450px] h-[350px] m-3 relative rounded-lg shadow-2xl text-xl p-3 text-white"
                    >
                       <FaEdit
                          className="absolute right-7 top-7 text-xl cursor-pointer hover:scale-125"
                          onClick={() => {
                             handleEditClick(item);
                          }}
                       />
                       <div className="flex m-3 items-center border-b p-2">
                          <p className="font-serif text-2xl">Numer pokoju:</p>
                          <p className="ml-2 p-2 bg-green-500 w-10 h-10 text-center rounded-full font-bold leading-5">
                             {item.nrPokoju}
                          </p>
                       </div>
                       <div className="flex p-2">
                          <p>Cena:</p>
                          <p className="ml-2">{`${item.cena} zł`}</p>
                       </div>
                       <div className="flex p-2">
                          <p>Ilość łóżek: </p>
                          <p className="ml-2">{item.iloscLozek}</p>
                       </div>
                       <div className="flex p-2">
                          <p>Maksymalna ilość gości:</p>
                          <p className="ml-2">{item.maxOsob}</p>
                       </div>
                       <div className="flex p-2">
                          <p>Status pokoju:</p>
                          <p
                             className={`ml-2 font-bold ${
                                item.status == "Wolny"
                                   ? "text-green-500"
                                   : "text-red-500"
                             }`}
                          >
                             {item.status}
                          </p>
                       </div>
                       <div className="flex p-2">
                          <p>Posprzątany:</p>
                          <p
                             className={`ml-2 font-bold ${
                                item.posprzatany == 1
                                   ? "text-green-500"
                                   : "text-red-500"
                             }`}
                          >
                             {item.posprzatany == 1 ? "Tak" : "Nie"}
                          </p>
                       </div>
                    </div>
                 ))}
         </div>
      </>
   );
}

export default PokojElement;
