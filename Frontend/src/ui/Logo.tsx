import { FC } from "react";
import logo from "../../public/logo.svg";

const Logo: FC = () => {
   return (
      <div className="flex items-center justify-center">
         <img className="h-16 xl:h-26 mt-4 xl:h-28" src={logo} alt="Logo" />
      </div>
   );
};

export default Logo;
