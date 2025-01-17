import { X } from "react-feather";
import { ReactNode } from "react";

interface ModalProps {
   open: boolean;
   onClose: () => void;
   children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
   return (
      <div
         className={`
        fixed backdrop-blur-lg inset-0 flex z-50 justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
      >
         {/* modal */}
         <div
            onClick={(e) => e.stopPropagation()}
            className={`
          bg-gray-200 rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
         >
            <button
               onClick={onClose}
               className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-gray-200 hover:bg-gray-50 hover:text-gray-600"
            >
               <X width={32} height={32} />
            </button>
            {children}
         </div>
      </div>
   );
}
