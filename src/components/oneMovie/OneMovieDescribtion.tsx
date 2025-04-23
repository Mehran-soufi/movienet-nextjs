"use client";

import React, { useEffect, useState } from "react";
import { OneMovieData } from "@/app/[type]/[title]/[id]/page";

async function fetchMovieCredits(movieId: string, type: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch credits");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    return null;
  }
}

// استخراج کارگردان و تهیه‌کننده از لیست عوامل
function getDirectorAndProducer(crew: any[]) {
  const director = crew.find((person) => person.job === "Director");
  const producer = crew.find((person) => person.job === "Producer");

  return {
    director: director?.name || "Unknown Director",
    producer: producer?.name || "Unknown Producer",
  };
}

function OneMovieDescribtion({
  movieData,
  type,
}: {
  movieData: OneMovieData;
  type: string;
}) {
  const [credits, setCredits] = useState({ director: "", producer: "" });

  useEffect(() => {
    const fetchCredits = async () => {
      const creditsData = await fetchMovieCredits(
        movieData.id.toString(),
        type
      );
      if (creditsData) {
        const { director, producer } = getDirectorAndProducer(creditsData.crew);
        setCredits({ director, producer });
      }
    };

    fetchCredits();
  }, [movieData.id, type]);

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {/* بخش Overview */}
      <div className="w-full">
        <h2 className="font-bold uppercase text-lg text-rose-400">
          {movieData.title} Overview
        </h2>
        <p className="text-justify w-full" style={{ padding: "1rem 0" }}>
          {movieData.overview}
        </p>
      </div>

      {/* بخش About */}
      <div className="w-full">
        <h2 className="font-bold uppercase text-lg text-rose-400">
          About {movieData.title}
        </h2>
        <p className="text-justify w-full" style={{ padding: "1rem 0" }}>
          {movieData.title || movieData.name} is a{" "}
          {movieData.genres.map((genre) => genre.name).join(" - ")} film
          directed by {credits.director || "Unknown"} and produced by{" "}
          {credits.producer || "Unknown"}, which was released on{" "}
          {movieData.release_date}. The film has so far received a score of{" "}
          {movieData.vote_average.toFixed(1)} out of a total of{" "}
          {movieData.vote_count} reviews.{" "}
          {movieData.revenue ||
            (movieData.budget &&
              `The total sales of the film are{" "}
${movieData.revenue}$ and its production budget is ${movieData.budget}$.`)}
        </p>
      </div>

      {/* بخش Production Companies */}
      <div className="w-full">
        <h2 className="font-bold uppercase text-lg text-rose-400">
          Production Companies
        </h2>
        <div
          className="w-full flex flex-wrap justify-center items-center gap-4"
          style={{ margin: "1rem 0" }}
        >
          {movieData.production_companies.map((item) => (
            <div
              key={item.id}
              className="rounded-xl shadow-inner shadow-gray-800 cursor-default"
              style={{ padding: ".5rem" }}
            >
              <div className="flex items-center justify-start gap-4">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover object-center bg-gray-100"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/noImg/no_img.jpeg";
                  }}
                />
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OneMovieDescribtion;
