"use client";
import { OnePersonType } from "@/app/person/[id]/[name]/page";
import React, { useEffect, useState } from "react";

function OneActorPicture({ PersonData }: { PersonData: OnePersonType }) {
  const [paddingTop, setPaddingTop] = useState<string>("0"); 

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth > 768) {
        setPaddingTop("0rem");
      } else {
        setPaddingTop("2rem");
      }
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth); 

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div
      className="w-11/12 h-4/5 rounded-xl"
      style={{ paddingTop: paddingTop }} 
    >
      <img
        src={
          PersonData.profile_path
            ? `https://image.tmdb.org/t/p/original${PersonData.profile_path}`
            : "/assets/noImg/no_img.jpeg"
        }
        onError={(e) => {
          e.currentTarget.src = "/assets/noImg/no_img.jpeg";
        }}
        alt={PersonData.name}
        className="w-full h-full rounded-xl shadow-lg shadow-gray-800"
      />
    </div>
  );
}

export default OneActorPicture;