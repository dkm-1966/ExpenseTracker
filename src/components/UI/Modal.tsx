import { IModalProps } from "@/types/types";
import { FC } from "react";

const Modal: FC<IModalProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 p-5 rounded-lg text-gray-300 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};

export default Modal;
