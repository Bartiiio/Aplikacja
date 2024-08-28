import { FC } from "react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   LabelList,
} from "recharts";
import { useRezerwacje } from "../hooks/useRezerwacje";

function getUpcomingReservations(rezerwacje) {
   const today = new Date();
   const tomorrow = new Date();
   const dayAfterTomorrow = new Date();

   tomorrow.setDate(today.getDate() + 1);
   dayAfterTomorrow.setDate(today.getDate() + 2);

   today.setHours(0, 0, 0, 0);
   tomorrow.setHours(0, 0, 0, 0);
   dayAfterTomorrow.setHours(0, 0, 0, 0);

   const calculatePeopleForDay = (day) => {
      return rezerwacje.reduce((acc: number, rezerwacja) => {
         const startDate = new Date(rezerwacja.odKiedy);
         const endDate = new Date(rezerwacja.doKiedy);

         if (rezerwacja.sniadanie === 1 && startDate <= day && endDate >= day) {
            return acc + rezerwacja.iloscOsob;
         }
         return acc;
      }, 0);
   };

   const result = [
      {
         name: "dzisiaj",
         liczbaOsob: calculatePeopleForDay(today),
      },
      {
         name: "jutro",
         liczbaOsob: calculatePeopleForDay(tomorrow),
      },
      {
         name: "pojutrze",
         liczbaOsob: calculatePeopleForDay(dayAfterTomorrow),
      },
   ];

   return result;
}

const Wykres: FC = () => {
   const { rezerwacje = [] } = useRezerwacje();

   const daneDoWykresu = getUpcomingReservations(rezerwacje);

   return (
      <div className="w-full h-full flex justify-center items-center -translate-x-8">
         <ResponsiveContainer width="100%" height="75%">
            <BarChart
               width={500}
               height={300}
               data={daneDoWykresu}
               margin={{
                  right: 20,
                  left: 20,
               }}
            >
               <XAxis dataKey="name" stroke="#FFFFFF" strokeWidth={2} />
               <YAxis stroke="#FFFFFF" strokeWidth={2} />
               <Tooltip
                  wrapperStyle={{ outline: "none" }}
                  cursor={{ fill: "transparent" }}
               />
               <Bar dataKey="liczbaOsob" fill="#10B981" radius={[10, 10, 0, 0]}>
                  <LabelList
                     dataKey="liczbaOsob"
                     position="top"
                     style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        offset: 10,
                        fill: "#FFFFFF",
                     }}
                  />
               </Bar>
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Wykres;
