import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useSession } from "../hooks/useSession";

interface ProtectedRouteProps {
   children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
   const navigate = useNavigate();
   const { session = {} } = useSession();

   useEffect(
      function () {
         if (!session) navigate("/login");
      },
      [session, navigate]
   );

   if (session) return children;
}

export default ProtectedRoute;
