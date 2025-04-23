"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { SkeletonLoader } from "../home/home_Item/HomeItemResItems";

export type heroMovie = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  profile_path: string;
  release_date: string;
  first_air_date: string;
  gender: number;
  genre_ids: number[];
  vote_average: number;
  media_type: string;
};

function truncateTitle(title: string, maxLength: number): string {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

const btnSearch = [
  { title: "all" },
  { title: "movies" },
  { title: "series" },
  { title: "actor" },
];

async function fetchSearch(searchInput: string, searchCategory: string) {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;
  try {
    const categoryPath =
      searchCategory === "movies"
        ? "movie"
        : searchCategory === "series"
        ? "tv"
        : searchCategory === "actor"
        ? "person"
        : "multi";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${categoryPath}?query=${searchInput}&api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

function SearchComponent({
  setSearchShow,
}: {
  setSearchShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchItem, setSearchItem] = useState<string>("all");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<heroMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchInput.length >= 3) {
        const results = await fetchSearch(searchInput, searchItem);
        setSearchResult(results);
      } else {
        setSearchResult([]);
      }
    };
    searchMovies();
  }, [searchInput, searchItem]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (!searchResult || searchResult.length === 0) {
        setError(true);
      }
      setLoading(false);
    }, 1500);
  }, [searchResult]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [searchResult]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[10000] flex justify-end overflow-hidden">
      <div className="lg:w-1/3 w-full h-full bg-gradient-to-b from-gray-950 to-gray-950/80 flex justify-center items-center">
        <div className="w-11/12 h-11/12">
          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <p className="uppercase font-bold">search</p>
              <button
                className="flex items-center gap-1 cursor-pointer bg-rose-400 rounded-xl outline-none"
                style={{ padding: ".3rem .5rem" }}
                onClick={() => setSearchShow(false)}
              >
                <X />
                <p>close</p>
              </button>
            </div>
            <div className="w-full justify-center items-center">
              <div className="w-11/12" style={{ margin: "0 auto" }}>
                <input
                  type="search"
                  className="w-full border-none outline-none bg-gray-900"
                  placeholder="search something..."
                  style={{ padding: ".5rem" }}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                {btnSearch.map((item, index) => (
                  <button
                    className={`outline-none cursor-pointer uppercase transition duration-200 ease-linear ${
                      searchItem === item.title
                        ? "border-b border-rose-500"
                        : "border-none"
                    }`}
                    style={{ padding: ".2rem", margin: "1rem .5rem" }}
                    key={index}
                    onClick={() => setSearchItem(item.title)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            {loading ||
              (error && (
                <div className="w-full">
                  <Swiper
                    slidesPerView={1.3}
                    spaceBetween={10}
                    breakpoints={{
                      640: { slidesPerView: 2.3, spaceBetween: 10 },
                      768: { slidesPerView: 2.3, spaceBetween: 10 },
                      1024: { slidesPerView: 2.3, spaceBetween: 10 },
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
              ))}
            {searchResult && (
              <div className="w-full">
                <Swiper
                  slidesPerView={1.3}
                  spaceBetween={10}
                  breakpoints={{
                    640: { slidesPerView: 2.3, spaceBetween: 10 },
                    768: { slidesPerView: 2.3, spaceBetween: 10 },
                    1024: { slidesPerView: 2.3, spaceBetween: 10 },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper w-full h-full group"
                >
                  {searchResult.map((item: heroMovie) => (
                    <SwiperSlide key={item.id}>
                      <Link
                        href={`${
                          item.title && !item.gender
                            ? `/movie/${encodeURIComponent(item.title)}/${
                                item.id
                              }`
                            : item.name && !item.gender
                            ? `/tv/${encodeURIComponent(item.name)}/${item.id}`
                            : item.gender
                            ? `/person/${item.id}/${encodeURIComponent(
                                item.name
                              )}`
                            : null
                        }`}
                        target="_blank"
                        className="w-full h-full no-underline flex-col cursor-pointer relative group overflow-hidden transition-opacity duration-300 opacity-100 group-hover:opacity-30 hover:!opacity-100"
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
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
