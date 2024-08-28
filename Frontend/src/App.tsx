import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Sniadania from "./pages/Sniadania";
import Platnosci from "./pages/Platnosci";
import Rezerwacje from "./pages/Rezerwacje";
import Pokoje from "./pages/Pokoje";
import Ustawienia from "./pages/Ustawienia";
import Pracownicy from "./pages/Pracownicy";
import Pulpit from "./pages/Pulpit";
import Login from "./pages/Login";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
      },
   },
});

function App() {
   return (
      <>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Routes>
                  <Route element={<AppLayout />}>
                     <Route index element={<Navigate replace to="pulpit" />} />
                     <Route path="pulpit" element={<Pulpit />} />
                     <Route path="sniadania" element={<Sniadania />} />
                     <Route path="platnosci" element={<Platnosci />} />
                     <Route path="rezerwacje" element={<Rezerwacje />} />
                     <Route path="pokoje" element={<Pokoje />} />
                     <Route path="pracownicy" element={<Pracownicy />} />
                     <Route path="ustawienia" element={<Ustawienia />} />
                     <Route path="*" element={<Pulpit />} />
                  </Route>
                  <Route path="login" element={<Login />} />
               </Routes>
            </BrowserRouter>
            <Toaster
               position="top-center"
               gutter={12}
               containerStyle={{ margin: "8px" }}
               toastOptions={{
                  success: {
                     duration: 2000,
                  },
                  error: {
                     duration: 4000,
                  },
                  style: {
                     fontSize: "16px",
                     maxWidth: "500px",
                     padding: "16px 24px",
                     backgroundColor: "darkgrey",
                     color: "var(--color-grey-700)",
                  },
               }}
            />
         </QueryClientProvider>
      </>
   );
}

export default App;
