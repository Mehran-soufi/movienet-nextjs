import { OneMovieData } from "@/app/[type]/[title]/[id]/page";
import React from "react";
import OneMovieHero from "./OneMovieHero";
import OneMovieTrailer from "./OneMovieTrailer";
import OneMovieDescribtion from "./OneMovieDescribtion";
import OneMoviecredits from "./OneMoviecredits";
import OneMoveiComments from "./OneMoveiComments";

function OneMovie({
  movieData,
  type,
}: {
  movieData: OneMovieData;
  type: string;
}) {
  return (
    <section className="w-full">
      <OneMovieHero movieData={movieData} />
      <div
        className="w-11/12 flex justify-center items-center lg:flex-row flex-col lg:gap-0 gap-2"
        style={{ margin: "3rem auto" }}
      >
        <div className="lg:w-1/2 w-full h-full">
          <OneMovieTrailer id={movieData.id.toString()} type={type} />
        </div>
        <div className="lg:w-1/2 w-full flex lg:justify-end justify-center items-center">
          <OneMovieDescribtion movieData={movieData} type={type} />
        </div>
      </div>
      <div
        className="w-full flex justify-center items-center"
        style={{ margin: "2rem 0" }}
      >
        <OneMoviecredits id={movieData.id.toString()} type={type} />
      </div>
      <div
        className="w-full flex justify-center items-center"
        style={{ margin: "2rem 0" }}
      >
        <OneMoveiComments id={movieData.id.toString()} type={type}/>
      </div>
    </section>
  );
}

export default OneMovie;
