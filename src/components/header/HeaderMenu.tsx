"use client";
import { Clapperboard, House, Tv, User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type menuBtnType = {
  title: string;
  link: string;
  icon: React.ReactElement;
};
const menuBtn: menuBtnType[] = [
  {
    title: "Home",
    link: "/",
    icon: <House />,
  },
  {
    title: "movies",
    link: "/movies",
    icon: <Clapperboard />,
  },
  {
    title: "series",
    link: "/series",
    icon: <Tv />,
  },
  {
    title: "actors",
    link: "/actors",
    icon: <User />,
  },
];

function HeaderMenu() {
  const pathName = usePathname();

  return (
    <div className="flex justify-center lg:items-center gap-8 bg-transparent">
      {menuBtn.map((item, index) => (
        <Button asChild key={index} variant="default">
          <Link
            href={item.link}
            className={`h-full link flex lg:flex-row flex-col items-center lg:gap-1 uppercase transition duration-300 ease-linear overflow-hidden ${
              pathName === item.link ? "link-active" : ""
            }`}
          >
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default HeaderMenu;
