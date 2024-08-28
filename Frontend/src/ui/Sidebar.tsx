import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { FaCalendarCheck } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";

function Sidebar() {
   return (
      <div className="bg-gray-400 row-span-full hidden md:block md:p-4 xl:w-48">
         <Logo />
         <nav className="flex flex-col mt-24 items-center xl:items-start font-medium xl:p-2">
            <NavLink
               to={"pulpit"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110 active:link:border-1">
                  <IoHomeSharp className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Pulpit</p>
               </div>
            </NavLink>
            <NavLink
               to={"sniadania"}
               className={({ isActive }) =>
                  ` ${isActive ? "text-green-500" : ""}`
               }
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110 ">
                  <IoFastFood className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Śniadania</p>
               </div>
            </NavLink>
            <NavLink
               to={"platnosci"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110">
                  <FaMoneyBill1Wave className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Płatności</p>
               </div>
            </NavLink>
            <NavLink
               to={"rezerwacje"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110">
                  <FaCalendarCheck className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Rezerwacje</p>
               </div>
            </NavLink>
            <NavLink
               to={"pokoje"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110">
                  <LiaDoorOpenSolid className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Pokoje</p>
               </div>
            </NavLink>
            <NavLink
               to={"pracownicy"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110">
                  <FaUsersGear className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Pracownicy</p>
               </div>
            </NavLink>
            <NavLink
               to={"ustawienia"}
               className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
               <div className="p-1 py-6 cursor-pointer xl:flex hover:scale-110">
                  <IoSettingsSharp className="text-2xl" />
                  <p className="hidden xl:block xl:px-2">Ustawienia</p>
               </div>
            </NavLink>
         </nav>
      </div>
   );
}

export default Sidebar;
