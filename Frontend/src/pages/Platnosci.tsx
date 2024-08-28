import { FC } from "react";
import PlatnosciTabela from "../ui/PlatnosciTabela";

const Platnosci: FC = () => {
   return (
      <div className="flex flex-col">
         <div className="flex flex-row items-center justify-between p-3">
            <h1 className="text-gray-200 text-3xl md:text-4xl p-4 md:p-8 font-serif">
               Statusy płatności
            </h1>
         </div>
         <div>
            <PlatnosciTabela />
         </div>
      </div>
   );
};

export default Platnosci;
