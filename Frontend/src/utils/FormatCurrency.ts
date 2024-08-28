const formatCurrency = (value: string | null | undefined | number): string => {
   if (value == null || typeof value !== "string" || isNaN(parseFloat(value))) {
      console.warn("Invalid value:", value);
      return "0 PLN";
   }

   const num = parseFloat(value);

   const formatNumber = (num: number): string => {
      const rounded = num.toFixed(2);

      const [integerPart, decimalPart] = rounded.split(".");

      const formattedIntegerPart = integerPart.replace(
         /\B(?=(\d{3})+(?!\d))/g,
         "."
      );

      return `${formattedIntegerPart},${decimalPart}`;
   };

   return `${formatNumber(num)} PLN`;
};

export default formatCurrency;
