"use client";
import React, { useState } from "react";
import { LogIn, Search } from "lucide-react";
import { Button } from "../ui/button";

import SearchComponent from "../search/SearchComponent";

function HeaderBtn() {
  const [searchShow, setSearchShow] = useState<Boolean>(false);
  return (
    <>
      <div className="flex justify-end items-center gap-2">
        <Button
          variant="btnCustom"
          className="border border-rose-400 bg-transparent transition-all duration-300 ease-linear hover:bg-[#ef5050]"
          style={{ padding: ".2rem .4rem" }}
          onClick={() => setSearchShow(true)}
        >
          <Search />
          <span className="md:inline-block hidden">Search</span>
        </Button>
        <Button
          variant="btnCustom"
          className=" border border-rose-400 transition-all duration-300 ease-linear hover:bg-transparent"
          style={{ padding: ".2rem .4rem" }}
        >
          <LogIn />
          <span className="md:inline-block hidden">Login</span>
        </Button>
      </div>
      {searchShow && <SearchComponent setSearchShow={setSearchShow} />}
    </>
  );
}

export default HeaderBtn;
