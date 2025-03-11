"use client";

import { ILink } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface ICustomLinkProps {
  link: ILink;
}

const CustomLink: FC<ICustomLinkProps> = ({ link }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <p
      onClick={() => router.replace(link.href)}
      key={link.href}
      className={
        pathname === link.href
          ? "hover:translate-x-1 duration-200 text-blue-500 cursor-pointer"
          : "hover:translate-x-1 duration-200 cursor-pointer"
      }
    >
      {link.text}
    </p>
  );
};

export default CustomLink;
