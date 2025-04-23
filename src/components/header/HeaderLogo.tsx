import React from "react";
import Image from "next/image";
import Link from "next/link";

function HeaderLogo() {
  return (
    <div className="flex justify-start items-center select-none ">
      <Link href="/" className="flex items-center cursor-pointer no-underline">
        <Image
          src="/assets/logo/logo.png"
          alt="movienet logo"
          width={50}
          height={50}
          className=""
        />
        <h1 className="text-[#ef5050] lg:text-3xl sm:text-2xl text-xl logo-font">movienet</h1>
      </Link>
    </div>
  );
}

export default HeaderLogo;
