import { IInputProps } from "@/types/types";
import React, { FC } from "react";

const Input: FC<IInputProps> = ({
  type,
  id,
  value,
  placeholder,
  changeHandler,
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      id={id}
      className="rounded text-gray-700 border-0 focus:outline-none p-1 pl-3 pr-8 py-2 w-full bg-gray-50"
      onChange={changeHandler}
    />
  );
};

export default Input;
