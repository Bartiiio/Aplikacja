import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import SidebarMobile from "./SidebarMobile";
import { useLogout } from "../hooks/useLogout";

function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { logout: LogoutUser } = useLogout();

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const logout = () => {
      LogoutUser();
   };

   return (
      <div className="bg-gray-400 gap-8 col-span-full md:col-span-1 relative">
         <div
            onClick={toggleMenu}
            className="h-full absolute md:hidden cursor-pointer"
         >
            <IoMenu className="w-full h-full text-center " />
         </div>
         {isMenuOpen && <SidebarMobile onToggleMenu={toggleMenu} />}

         <div className="w-full h-full flex items-center justify-between">
            <p className="ml-16 md:ml-8 font-serif">
               mgr. Hotel - Bartosz Troń
            </p>
            <div className="flex items-center justify-end">
               <FaRegUserCircle className="text-xl mx-4 sm:text-2xl" />
               <TbLogout
                  onClick={logout}
                  className="text-xl cursor-pointer hover:scale-110 mr-4 md:mr-6 xl:mr-8 sm:text-2xl md:font-bold"
               />
            </div>
         </div>
      </div>
   );
}

export default Header;
