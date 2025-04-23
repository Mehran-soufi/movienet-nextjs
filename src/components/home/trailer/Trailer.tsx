import React from "react";
import TrailerItems from "./TrailerItems";

const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

async function fetchTrailer() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results || [];
    
  } catch (error) {
    console.log(error);
        throw new Error("Failed to fetch comments data");

  }
}

async function Trailer() {
  const trailerItems = await fetchTrailer();

  return (
    <section className="w-full h-[60vh] bg-gradient-to-br from-rose-900/30 to-rose-900">
      <div className="w-full h-[15%] flex justify-center items-center">
        <p className="text-lg uppercase text-slate-300 font-bold">
          upcoming movies Trailer
        </p>
      </div>
      <div className="w-full h-[85%] flex justify-center items-center">
       <TrailerItems trailerItems={trailerItems} />
      </div>
    </section>
  );
}

export default Trailer;
