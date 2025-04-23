"use client";
import React from "react";

function OneMoviePoster({ image, title }: { image: string; title: string }) {


  return (
    <div className="md:w-full w-4/5 md:h-4/5 h-[90%] rounded-lg">
    <img
      src={
        image
          ? `https://image.tmdb.org/t/p/w500${image}`
          : "/assets/noImg/no_img.jpeg"
      }
      onError={(e) => {
        e.currentTarget.src = "/assets/noImg/no_img.jpeg";
      }}
      alt={title}
      className="w-full h-full rounded-lg"
    />
  </div>
  );
}

export default OneMoviePoster;
