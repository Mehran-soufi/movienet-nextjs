"use client";

import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { movieGenresList, tvGenresList } from "@/utils/genres";
import Link from "next/link";

export type heroMovie = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  profile_path: string;
  release_date: string;
  first_air_date: string;
  gender: number;
  genre_ids: [];
  vote_average: number;
  media_type: string;
  total_pages: number;
};

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

export function SkeletonLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-[85%] rounded-md bg-gray-700 animate-pulse"></div>
      <div
        className="w-full h-[15%] rounded-md bg-gray-700 animate-pulse"
        style={{ marginTop: ".5rem" }}
      ></div>
    </div>
  );
}

function HomeItemResItems({ movies }: { movies: heroMovie[] | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (!movies || movies.length === 0) {
        setError(true);
      }
      setLoading(false);
    }, 1500);
  }, [movies]);

  if (loading || error) {
    return (
      <div className="w-full h-[40vh]">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2.3, spaceBetween: 10 },
            768: { slidesPerView: 3.3, spaceBetween: 10 },
            1024: { slidesPerView: 6.3, spaceBetween: 10 },
          }}
          className="mySwiper w-full h-full"
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonLoader />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView={1.3}
      spaceBetween={10}
      breakpoints={{
        640: { slidesPerView: 2.3, spaceBetween: 10 },
        768: { slidesPerView: 3.3, spaceBetween: 10 },
        1024: { slidesPerView: 6.3, spaceBetween: 10 },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full h-full group"
    >
      {movies &&
        movies.map((item: heroMovie) => {
          return (
            <SwiperSlide key={item.id}>
              <Link
                href={`${
                  item.title && !item.gender
                    ? `/movie/${encodeURIComponent(item.title)}/${item.id}`
                    : item.name && !item.gender
                    ? `/tv/${encodeURIComponent(item.name)}/${item.id}`
                    : item.gender
                    ? `/person/${item.id}/${encodeURIComponent(item.name)}`
                    : null
                }`}
                target="_blank"
                className="w-full h-full no-underline flex-col cursor-pointer relative group
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
                  <p className="w-full h-full flex justify-center items-center text-justify">
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
                        item.first_air_date?.split("-")[0] ||
                        (item.gender === 1
                          ? "Woman"
                          : item.gender === 2
                          ? "Man"
                          : "Unknown")}
                    </span>
                    {!item.gender && (
                      <div
                        className="w-full h-full flex flex-col items-start justify-end"
                        style={{ padding: ".5rem" }}
                      >
                        <div className="w-full">
                          <p className="text-slate-200">
                            {getGenreNames(item.genre_ids, true)}
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
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default HomeItemResItems;
