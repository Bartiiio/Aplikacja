import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { usePracownicy } from "../hooks/usePracownicy";
import { formatPhoneNumber } from "../utils/formatNumber.ts";

const PracownicyTabela = () => {
   const { pracownicy = [] } = usePracownicy();

   return (
      <div className="overflow-x-auto p-4">
         <Table className="min-w-full text-white border border-gray-700">
            <Thead>
               <Tr className="bg-neutral-900">
                  <Th className="border-b border-gray-400 p-2 text-left">ID</Th>
                  <Th className="border-b border-gray-400 p-2 text-left">
                     Imię
                  </Th>
                  <Th className="border-b border-gray-400 p-2 text-left">
                     Nazwisko
                  </Th>
                  <Th className="border-b border-gray-400 p-2 text-left">
                     Stanowisko
                  </Th>
                  <Th className="border-b border-gray-400 p-2 text-left">
                     Numer telefonu
                  </Th>
               </Tr>
            </Thead>
            <Tbody>
               {pracownicy.map((pracownik) => (
                  <Tr
                     key={pracownik.id}
                     className="bg-neutral-700 hover:bg-neutral-500"
                  >
                     <Td className="border-b border-gray-400 p-2">
                        {pracownik.id}
                     </Td>
                     <Td className="border-b border-gray-400 p-2">
                        {pracownik.imie}
                     </Td>
                     <Td className="border-b border-gray-400 p-2">
                        {pracownik.nazwisko}
                     </Td>
                     <Td className="border-b border-gray-400 p-2">
                        {pracownik.stanowisko}
                     </Td>
                     <Td className="border-b border-gray-400 p-2">
                        {formatPhoneNumber(pracownik.nrtelefonu)}
                     </Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </div>
   );
};

export default PracownicyTabela;
