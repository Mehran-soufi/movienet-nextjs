"use client";
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import Link from "next/link";

type Cast = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
};

type Crew = {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
};

async function fetchCastMovie({
  params,
}: {
  params: { id: string; type: string };
}): Promise<{ cast: Cast[]; crew: Crew[] }> {
  const { id, type } = params;
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cast and crew data");
    }

    const data = await response.json();
    return { cast: data.cast || [], crew: data.crew || [] };
  } catch (error) {
    console.error("Error fetching cast and crew:", error);
    throw new Error("Failed to fetch cast and crew data");
  }
}

function OneMoviecredits({ id, type }: { id: string; type: string }) {
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCastsAndCrew = async () => {
      try {
        setLoading(true);
        const { cast, crew } = await fetchCastMovie({ params: { id, type } });
        setCast(cast.slice(0, 15));
        setCrew(crew.slice(0, 15));
      } catch (error) {
        console.error("Error fetching cast and crew:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCastsAndCrew();
  }, [id, type]);

  if (loading || error) {
    return (
      <div className="w-11/12 flex flex-col gap-8">
        {/* Skalrton for cast*/}
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <div className="w-full">
            <h2 className="uppercase text-slate-200 font-bold text-xl">
              Loading cast...
            </h2>
          </div>
          <div className="w-full flex gap-4">
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
              className="mySwiper w-full h-full"
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[10vh] rounded-xl bg-slate-700 animate-pulse"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Skalrton for crew*/}
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <div className="w-full">
            <h2 className="uppercase text-slate-200 font-bold text-xl">
              Loading crew...
            </h2>
          </div>
          <div className="w-full flex gap-4">
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
              className="mySwiper w-full h-full"
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[10vh] rounded-xl bg-slate-700 animate-pulse"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 flex flex-col gap-8">
      {/* cast */}
      {cast && (
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <div className="w-full">
            <h2 className="uppercase text-slate-200 font-bold text-xl">cast</h2>
          </div>
          <div className="w-full">
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
              className="mySwiper w-full h-full"
            >
              {cast.map((actor, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/person/${actor.id}/${encodeURIComponent(
                      actor.name
                    )}`}
                    target="_blank"
                    className="no-underline w-full h-full cursor-pointer flex justify-center items-center shadow-inner shadow-gray-800 rounded-xl"
                    style={{ padding: ".5rem" }}
                  >
                    <div className="flex justify-center items-center w-1/3 h-full">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                            : "/assets/noImg/no_img.jpeg"
                        }
                        alt={actor.name}
                        className="w-16 h-16 rounded-full object-cover object-center"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col w-2/3">
                      <div className="flex items-center justify-start">
                        <p className="text-center text-sm">{actor.name}</p>
                      </div>
                      <div className="flex items-center justify-start">
                        <p className="text-slate-400 text-sm">
                          {actor.known_for_department}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* crew */}
      {crew && (
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <div className="w-full">
            <h2 className="uppercase text-slate-200 font-bold text-xl">crew</h2>
          </div>
          <div className="w-full">
            <Swiper
              slidesPerView={1.3}
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 2.3, spaceBetween: 10 },
                768: { slidesPerView: 3.3, spaceBetween: 10 },
                1024: { slidesPerView: 5.3, spaceBetween: 10 },
              }}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full h-full"
            >
              {crew.map((member, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/person/${member.id}/${encodeURIComponent(
                      member.name
                    )}`}
                    target="_blank"
                    className="no-underline w-full h-full cursor-pointer flex justify-center items-center shadow-inner shadow-gray-800 rounded-xl"
                    style={{ padding: ".5rem" }}
                  >
                    <div className="flex justify-center items-center w-1/3 h-full">
                      <img
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                            : "/assets/noImg/no_img.jpeg"
                        }
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover object-center"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col w-2/3">
                      <div className="flex items-center justify-start">
                        <p className="text-center text-sm">{member.name}</p>
                      </div>
                      <div className="flex items-center justify-start">
                        <p className="text-slate-400 text-sm">{member.job}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneMoviecredits;
