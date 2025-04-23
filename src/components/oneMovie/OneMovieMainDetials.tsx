import React from "react";
import { OneMovieData } from "@/app/[type]/[title]/[id]/page";

function OneMovieMainDetials({ movieData }: { movieData: OneMovieData }) {
  return (
    <div className="w-full h-4/5" style={{ padding: "1rem" }}>
      <div className="w-full h-full flex flex-col items-start justify-start gap-4">
        <div className="w-full flex items-center md:justify-start justify-center">
          <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold">
            {movieData.title || movieData.name}
          </h1>
        </div>
        <div className="w-full flex items-center md:justify-start justify-center">
          <p className="text-slate-300 lg:text-2xl md:text-xl text-lg">
            {movieData.tagline}
          </p>
        </div>
        <div className="w-full flex items-center gap-2 flex-wrap">
          <p className="font-bold">genres : </p>
          <p className="text-slate-300">
            {movieData.genres.map((genre) => genre.name).join(" - ")}
          </p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">IMDB : </p>
          <p className="text-slate-300">{movieData.vote_average.toFixed(1)}</p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">time : </p>
          {movieData.last_episode_to_air ? (
            <p className="text-slate-300">
              {movieData.last_episode_to_air.runtime} min
            </p>
          ) : (
            <p className="text-slate-300">{movieData.runtime} min</p>
          )}
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">year : </p>
          <p className="text-slate-300">
            {movieData.release_date?.split("-")[0] ||
              movieData.first_air_date?.split("-")[0]}
          </p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">countrie(s) : </p>
          <p className="text-slate-300">
            {movieData.origin_country.map((countrie) => countrie).join(" - ")}
          </p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">language(s) : </p>
          <p className="text-slate-300">
            {movieData.spoken_languages
              .map((language) => language.english_name)
              .join(" - ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OneMovieMainDetials;
