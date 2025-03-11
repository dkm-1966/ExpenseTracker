import { IButtonProps } from "@/types/types";
import React, { FC } from "react";

const Button: FC<IButtonProps> = ({ clickHandler, children }) => {
  return (
    <button
      className="bg-blue-500 text-gray-100 p-2 rounded w-40 cursor-pointer"
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
