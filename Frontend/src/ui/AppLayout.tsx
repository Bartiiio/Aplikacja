import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";

function AppLayout() {
   return (
      <div className="grid h-[100vh] grid-rows-[3rem_1fr] grid-cols-[auto_1fr]">
         <SideBar />
         <Header />
         <main className="p-2 col-span-full md:col-span-1 h-full bg-gray-900 w-full overflow-y-auto">
            <div className="my-0">
               <Outlet />
            </div>
         </main>
      </div>
   );
}

export default AppLayout;
