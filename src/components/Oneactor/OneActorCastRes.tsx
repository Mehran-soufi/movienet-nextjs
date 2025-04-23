"use client";
import React from "react";
import { heroMovie } from "../home/home_Item/HomeItemResItems";
import Link from "next/link";
import { movieGenresList, tvGenresList } from "@/utils/genres";

function truncateTitle(title: string, maxLength: number): string {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

function getGenreNames(genreIds: number[], isMovie: boolean): string {
  if (!genreIds || !Array.isArray(genreIds)) {
    return "Unknown";
  }
  const genreList = isMovie ? movieGenresList : tvGenresList;
  const genreNames = genreIds
    .map((id) => {
      const genre = genreList.find((g) => g.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  return genreNames.length > 0 ? genreNames.join(", ") : "Unknown";
}

function OneActorCastRes({ actorCast }: { actorCast: heroMovie[] }) {
  return (
    <div className="w-full flex flex-wrap flex-col justify-center items-center gap-4">
      <div className="w-11/12">
        <p className="font-bold text-lg uppercase text-slate-300">credits</p>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center gap-4">
        {actorCast &&
          actorCast.map((item, index) => {
            return (
              <Link
                href={`${
                  item.title
                    ? `/movie/${encodeURIComponent(item.title)}/${item.id}`
                    : item.name
                    ? `/tv/${encodeURIComponent(item.name)}/${item.id}`
                    : null
                }`}
                key={index}
                target="_blank"
                className="lg:w-1/6 sm:w-1/3 w-11/12 h-[40vh] no-underline flex-col cursor-pointer relative group
         overflow-hidden transition-opacity duration-300 opacity-100 group-hover:opacity-30 hover:!opacity-100"
              >
                <div className="w-full h-[85%] rounded-md overflow-hidden">
                  <img
                    src={
                      item.poster_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/w500${
                            item.poster_path || item.profile_path
                          }`
                        : "/assets/noImg/no_img.jpeg"
                    }
                    alt={item.title || item.name || "Default image"}
                    className="rounded-md w-full h-full"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/noImg/no_img.jpeg";
                    }}
                  />
                </div>
                <div className="w-full h-[15%]">
                  <p
                    className="w-full h-full flex justify-center items-center text-justify
            "
                  >
                    {truncateTitle(item.title || item.name, 20)}
                  </p>
                </div>
                <div className="w-full h-full overflow-hidden absolute top-0 left-0  transition-opacity duration-300 opacity-0 hover:opacity-100 z-20">
                  <div className="w-full h-[85%] hover:bg-gradient-to-t from-black/80 to-black/30 overflow-hidden">
                    <span
                      className="absolute top-3 -left-6 bg-[#ef5050] w-1/2 -rotate-45 text-sm flex justify-center items-center"
                      style={{ padding: ".3rem" }}
                    >
                      {item.release_date?.split("-")[0] ||
                        item.first_air_date?.split("-")[0]}
                    </span>
                    {!item.gender && (
                      <div
                        className="w-full h-full flex flex-col items-start justify-end"
                        style={{ padding: ".5rem" }}
                      >
                        <div className="w-full">
                          <p className="text-slate-200">
                            {getGenreNames(
                              item.genre_ids,
                              true /* یا false برای سریال‌ها */
                            )}
                          </p>
                        </div>
                        <div className="w-full flex items-center gap-1">
                          <p>IMDB : </p>
                          <p>
                            IMDB :{" "}
                            {item.vote_average
                              ? item.vote_average.toFixed(1)
                              : "Unknown"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default OneActorCastRes;
