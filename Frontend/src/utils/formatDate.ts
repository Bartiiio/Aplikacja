import { format, parseISO } from "date-fns";
import { pl } from "date-fns/locale";

function formatDate(isoDateString: string): string {
   const date = parseISO(isoDateString);
   return format(date, "eeee dd MMMM yyyy", { locale: pl });
}

const convertToDateFormat = (isoDateString: string): string => {
   const date = parseISO(isoDateString);

   return format(date, "yyyy-MM-dd");
};

export { formatDate, convertToDateFormat };
