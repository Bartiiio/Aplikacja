export const formatPhoneNumber = (number: string) => {
   const cleaned = ("" + number).replace(/\D/g, "");
   if (cleaned.length === 9) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
   }
   return number;
};
