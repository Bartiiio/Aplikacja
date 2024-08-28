import { FC } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { FaCalendarCheck } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

interface SidebarProps {
   onToggleMenu: () => void;
}

const SidebarMobile: FC<SidebarProps> = ({ onToggleMenu }) => {
   return (
      <div className="bg-gray-500 fixed w-full h-full p-0 m-0 z-40">
         <IoCloseSharp
            onClick={onToggleMenu}
            className="text-5xl fixed top-2 left-2 cursor-pointer"
         />
         <nav className="flex flex-col mt-32 items-center justify-center font-medium">
            <div className="text-3xl">
               <NavLink to={"pulpit"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <IoHomeSharp className="text-3xl" />
                     <p className="px-2">Pulpit</p>
                  </div>
               </NavLink>
               <NavLink to={"sniadania"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <IoFastFood className="text-3xl" />
                     <p className="px-2">Śniadania</p>
                  </div>
               </NavLink>
               <NavLink to={"platnosci"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <FaMoneyBill1Wave className="text-3xl" />
                     <p className="px-2">Płatności</p>
                  </div>
               </NavLink>
               <NavLink to={"rezerwacje"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <FaCalendarCheck className="text-3xl" />
                     <p className="px-2">Rezerwacje</p>
                  </div>
               </NavLink>
               <NavLink to={"pokoje"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <LiaDoorOpenSolid className="text-3xl" />
                     <p className="px-2">Pokoje</p>
                  </div>
               </NavLink>
               <NavLink to={"pracownicy"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <FaUsersGear className="text-3xl" />
                     <p className="px-2">Pracownicy</p>
                  </div>
               </NavLink>
               <NavLink to={"ustawienia"} onClick={onToggleMenu}>
                  <div className="p-1 mb-10 cursor-pointer flex items-center">
                     <IoSettingsSharp className="text-3xl" />
                     <p className="px-2">Ustawienia</p>
                  </div>
               </NavLink>
            </div>
         </nav>
      </div>
   );
};

export default SidebarMobile;
