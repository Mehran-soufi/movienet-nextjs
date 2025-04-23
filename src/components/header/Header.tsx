"use client";
import React, { useEffect, useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderBtn from "./HeaderBtn";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const [scroll, setScroll] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full flex justify-center items-center fixed top-0 z-[10000]
          ${
            scroll && "shadow-md shadow-gray-900 backdrop-blur-md bg-black/40"
          }`}
      style={{ padding: ".6rem 0" }}
    >
      <nav className="w-11/12 mx-auto flex justify-between items-center">
        <HeaderLogo />
        {isClient && window.innerWidth > 768 && <HeaderMenu />}
        <HeaderBtn />
      </nav>
    </header>
  );
}

export default Header;