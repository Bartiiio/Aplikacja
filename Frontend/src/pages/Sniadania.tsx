import { FC } from "react";
import Wykres from "../ui/Wykres";

const Sniadania: FC = () => {
   return (
      <div className="flex flex-col">
         <div className="flex flex-row items-center justify-between p-3">
            <h1 className="text-gray-200 text-3xl md:text-4xl p-4 md:p-8 font-serif">
               Ilość osób na śniadania
            </h1>
         </div>
         <div className="bg-neutral-700 w-[85vw] h-[82vh] md:h-[82.5vh]  rounded-xl mx-auto">
            <Wykres />
         </div>
      </div>
   );
};

export default Sniadania;
