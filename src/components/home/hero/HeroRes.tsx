"use client";

import {
  CalendarFold,
  ChartBarStacked,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { movieGenresList } from "@/utils/genres";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { HomeHeroType } from "../Home";
import Link from "next/link";

function HeroRes({ movies }: { movies: HomeHeroType[] }) {
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [imageSize, setImageSize] = useState<string>("original");

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    const updateImageSize = () => {
      if (window.innerWidth < 768) {
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

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      const updateActiveSlide = () => {
        setActiveSlide(swiper.realIndex);
        setProgress(0);
      };

      const startProgress = () => {
        setProgress(0);
      };

      swiper.on("slideChange", updateActiveSlide);
      swiper.on("transitionEnd", startProgress);

      return () => {
        swiper.off("slideChange", updateActiveSlide);
        swiper.off("transitionEnd", startProgress);
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <div className="w-full h-screen relative">
      <Swiper
        ref={swiperRef}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, EffectFade]}
        allowTouchMove={false}
        className="mySwiper w-full h-full"
      >
        {movies.slice(0, 5).map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="w-full h-full relative">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/${imageSize}${movie.backdrop_path}`
                    : "/assets/noImg/no_img.jpeg"
                }
                onError={(e) => {
                  e.currentTarget.src = "/assets/noImg/no_img.jpeg";
                }}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300 z-50">
                {activeSlide === index && (
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#ef5050",
                      transition: "width 0.1s linear",
                    }}
                  ></div>
                )}
              </div>
              <div className="w-full h-full absolute flex justify-center items-center top-0 left-0 md:bg-gradient-to-r bg-gradient-to-b from-black/90 to-black/20">
                <div
                  className="w-11/12 md:h-11/12 h-4/5 flex md:flex-row flex-col items-center justify-center"
                  style={{ padding: "2rem" }}
                >
                  <div className="w-full h-full flex flex-col md:items-start items-center md:justify-center justify-start gap-4">
                    <h2 className="text-white lg:text-5xl md:text-4xl text-2xl font-bold">
                      {movie.title}
                    </h2>
                    <ul className="flex items-center gap-1">
                      <li className="text-purple-300">
                        <ChartBarStacked />
                      </li>
                      <li>
                        {movie.genre_ids
                          .map((genreId: number) => {
                            const genre = movieGenresList.find(
                              (g) => g.id === genreId
                            );
                            return genre ? genre.name : "Unknown";
                          })
                          .join(" - ")}
                      </li>
                    </ul>
                    <ul className="flex items-center gap-1">
                      <li className="text-amber-300">
                        <Star />
                      </li>
                      <li>{movie.vote_average.toFixed(1)}</li>
                    </ul>
                    <ul className="flex items-center gap-1">
                      <li className="text-cyan-300">
                        <CalendarFold />
                      </li>
                      <li>{movie.release_date?.split("-")[0]}</li>
                    </ul>
                    <Link
                      href={`/${movie.media_type}/${encodeURIComponent(
                        movie.title
                      )}/${movie.id}`}
                      target="_blank"
                    >
                      <Button
                        variant="btnCustom"
                        style={{ padding: ".5rem 3rem" }}
                      >
                        View
                      </Button>
                    </Link>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="slideBtn"
                        style={{ padding: "0 .5rem" }}
                        onClick={goPrev}
                      >
                        <ChevronLeft />
                      </Button>
                      <Button
                        variant="slideBtn"
                        style={{ padding: "0 .5rem" }}
                        onClick={goNext}
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroRes;
