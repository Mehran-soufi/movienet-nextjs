"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Genre } from "@/utils/genres";
import Link from "next/link";

type IType = {
  title: string;
  genresList: Genre[];
  type: string;
};

function GenreItems({ title, genresList, type }: IType) {
  return (
    <div className="w-full h-[25vh] flex items-center justify-center select-none">
      <div className="w-full h-11/12 relative">
        <div className="z-50 absolute lg:left-0 right-0 top-0 lg:w-1/5 w-1/3 h-full flex lg:justify-start justify-end items-center bg-gray-950/80 lg:rounded-ee-full lg:rounded-es-none rounded-es-full">
          <div className="w-[95%] h-full bg-gray-900/60 flex justify-center items-center lg:rounded-ee-full lg:rounded-es-none rounded-es-full">
            <p className="uppercase md:text-lg">{title}</p>
          </div>
        </div>
        <div className="w-full h-full">
          <Swiper
            loop
            slidesPerView={1.4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3.3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4.4,
                spaceBetween: 20,
              },
            }}
            className="mySwiper w-full h-full"
          >
            {genresList.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  target="_blank"
                  href={`/${type}/${item.name}`}
                  className="w-full h-full cursor-pointer relative bg-gray-900 flex justify-end items-center rounded-xl transition-all duration-300 ease-linear hover:scale-95 shadow-inner shadow-gray-700"
                >
                  <img
                    src={item.img}
                    alt="War"
                    className="w-3/5 h-full z-20 opacity-60"
                    loading="lazy"
                  />
                  <div
                    className="absolute w-full h-full flex items-center justify-start"
                    style={{
                      paddingLeft: "1rem",
                    }}
                  >
                    <p className="lg:text-3xl text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-white inline-block text-transparent bg-clip-text">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default GenreItems;
