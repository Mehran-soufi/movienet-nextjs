"use client";
import React, { useEffect, useState } from "react";

function OneMovieBackDrop({ image, title }: { image: string; title: string }) {
  const [imageSize, setImageSize] = useState<string>("original");

  useEffect(() => {
    const updateImageSize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setImageSize("w500");
      } else {
        setImageSize("original");
      }
    };

    updateImageSize();
    window.addEventListener("resize", updateImageSize);

    return () => {
      window.removeEventListener("resize", updateImageSize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <img
        src={
          image
            ? `https://image.tmdb.org/t/p/${imageSize}${image}`
            : "/assets/noImg/no_img.jpeg"
        }
        onError={(e) => {
          e.currentTarget.src = "/assets/noImg/no_img.jpeg";
        }}
        alt={title}
        className="w-full h-full"
      />
    </div>
  );
}

export default OneMovieBackDrop;
