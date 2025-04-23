import React from "react";
import HomeItemResItems from "./HomeItemResItems";

async function fetchMovies({ link }: { link: string }) {
  try {
    const response = await fetch(`${link}`);
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

async function HomeItems({ link }: { link: string }) {
  const movies = await fetchMovies({ link });

  return (
    <div className="w-full h-[40vh]">
      <HomeItemResItems movies={movies} />
    </div>
  );
}

export default HomeItems;
