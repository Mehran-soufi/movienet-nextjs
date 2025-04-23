import { OneMovieData } from "@/app/[type]/[title]/[id]/page";
import React from "react";

function OneMovieStatus({ movieData }: { movieData: OneMovieData }) {
  return (
    <div className="lg:text-base text-sm" style={{ padding: "1rem" }}>
      <div className="w-full h-full flex md:flex-col flex-row md:gap-4 gap-2 md:items-end items-center justify-center md:justify-start">
        {movieData.adult && (
          <div className="w-full flex justify-end items-center">
            <span
              className="bg-yellow-600 text-white rounded-md"
              style={{ padding: ".5rem" }}
            >
              R
            </span>
          </div>
        )}
        <div className="w-full flex justify-end items-center">
          <span
            className="bg-cyan-700 text-white rounded-md"
            style={{ padding: ".5rem" }}
          >
            {movieData.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OneMovieStatus;
