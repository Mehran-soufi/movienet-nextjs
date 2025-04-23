import { OneMovieData } from "@/app/[type]/[title]/[id]/page";
import React from "react";
import OneMovieBackDrop from "./OneMovieBackDrop";
import OneMoviePoster from "./OneMoviePoster";
import OneMovieBtns from "./OneMovieBtns";
import OneMovieMainDetials from "./OneMovieMainDetials";
import OneMovieStatus from "./OneMovieStatus";

function OneMovieHero({ movieData }: { movieData: OneMovieData }) {
  return (
    <div className="w-full md:h-screen h-[110vh]">
      <div className="w-full h-full relative">
        <OneMovieBackDrop
          image={movieData.backdrop_path}
          title={movieData.title}
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center md:bg-gradient-to-r bg-gradient-to-t from-black/95 to-black/50">
          <div className="w-11/12 h-4/5 flex md:flex-row flex-col justify-start items-center">
            <div className="lg:w-1/4 md:w-2/5 w-full md:h-4/5 h-2/5 flex md:flex-col flex-col-reverse justify-center items-center gap-1">
              <OneMovieBtns />
              <OneMoviePoster
                image={movieData.poster_path}
                title={movieData.title}
              />
            </div>
            <div className="lg:w-4/5  md:w-3/5 md:h-4/5 h-3/5 flex justify-center md:items-end items-start">
              <OneMovieMainDetials movieData={movieData} />
            </div>
            <div className="absolute md:top-[30%] bottom-0 md:right-[5%]">
              <OneMovieStatus movieData={movieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneMovieHero;
