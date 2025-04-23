"use client";
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { CirclePlay } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

function truncateTitle(title: string, maxLength: number): string {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

async function fetchTrailerKey(movieId: number) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const trailer = data.results.find((video: any) => video.type === "Trailer");
    return trailer?.key || ""; 
  } catch (error) {
    console.error("Error fetching trailer key:", error);
    return ""; 
  }
}

type trailerType = {
  id: number;
  title: string;
  backdrop_path: string;
};

function SkeletonLoader() {
  return (
    <div className="w-full h-full rounded-md bg-gray-700 animate-pulse"></div>
  );
}

function TrailerItems({ trailerItems }: { trailerItems: trailerType[] }) {
  const [trailerKeys, setTrailerKeys] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadTrailerKeys() {
      setLoading(true);
      setError(false);
      try {
        const keys: Record<number, string> = {};
        for (const item of trailerItems) {
          const key = await fetchTrailerKey(item.id);
          keys[item.id] = key;
          if (!key) throw new Error("Failed to fetch a trailer key");
        }
        setTrailerKeys(keys);
      } catch (error) {
        console.error("Error loading trailer keys:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadTrailerKeys();
  }, [trailerItems]);

  if (loading || error) {
   
    return (
      <div className="w-full h-11/12">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1.3, spaceBetween: 10 },
            768: { slidesPerView: 2.3, spaceBetween: 10 },
            1024: { slidesPerView: 3.3, spaceBetween: 10 },
          }}
          centeredSlides
          loop={true}
          navigation={false}
          modules={[Navigation]}
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
    <div className="w-full h-11/12">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 1.3, spaceBetween: 10 },
          768: { slidesPerView: 2.3, spaceBetween: 10 },
          1024: { slidesPerView: 3.3, spaceBetween: 10 },
        }}
        centeredSlides
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full h-full group"
      >
        {trailerItems.map((item) => (
          <SwiperSlide key={item.id}>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${trailerKeys[item.id]}`}
              className="no-underline border-none w-full h-full flex-col cursor-pointer group
                  overflow-hidden transition-opacity duration-300 opacity-100 group-hover:opacity-50 hover:!opacity-100"
            >
              <div className="w-full h-[85%] rounded-md overflow-hidden relative flex justify-center items-center">
                <img
                  src={
                    item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                      : "/assets/noImg/no_img.jpeg"
                  }
                  onError={(e) => {
                    e.currentTarget.src = "/assets/noImg/no_img.jpeg";
                  }}
                  alt={item.title || "Default image"}
                  className="rounded-md w-full h-full "
                />
                <div className="w-full h-full bg-black/40 absolute top-0 left-0 flex justify-center items-center">
                  <CirclePlay size={50} />
                </div>
              </div>
              <div className="w-full h-[15%]">
                <p className="w-full h-full flex justify-center items-center text-justify">
                  {truncateTitle(item.title, 20)}
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrailerItems;