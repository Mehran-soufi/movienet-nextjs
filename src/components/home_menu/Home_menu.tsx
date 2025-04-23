"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { menuBtnType } from "../header/HeaderMenu";
import { Clapperboard, Tv, User } from "lucide-react";

const menuBtn: menuBtnType[] = [
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

function Home_menu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isMobile && (
        <section
          className="w-full flex justify-center items-center"
          style={{ margin: "1rem 0" }}
        >
          <div className="w-11/12 flex justify-center items-center flex-wrap" >
            {menuBtn.map((item, index) => (
              <div
                className="md:w-1/3 w-full"
                style={{ padding: "1rem 0" }}
                key={index}
              >
                <Link
                  href={item.link}
                  target="_blank"
                  className="w-11/12 rounded-xl shadow-inner shadow-[#ef5050]
                    flex justify-center items-center gap-1"
                  style={{ padding: "1rem",margin:"0 auto" }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home_menu;