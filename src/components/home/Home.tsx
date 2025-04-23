import React from "react";
import Hero from "./hero/Hero";
import Genre from "./genre/Genre";
import HomeItem from "./home_Item/HomeItem";
import Trailer from "./trailer/Trailer";
import Home_menu from "../home_menu/Home_menu";

const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

export type HomeHeroType = {
  backdrop_path: string;
  title: string;
  genre_ids: number[];
  id: number;
  vote_average: number;
  release_date: string;
  media_type: string;
};

function HomePage({ movies }: { movies: HomeHeroType[] }) {
  return (
    <section className="w-full">
      <Hero movies={movies} />
      <Home_menu />
      <Genre />
      {/* popular */}
      <HomeItem
        title="popular day movie"
        type="movie"
        link={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`}
      />
      <HomeItem
        title="popular day series"
        type="tv"
        link={`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=1`}
      />
      {/* popular end */}
      {/* Actors */}
      <div className="w-full bg-rose-900" style={{ padding: "1rem 0" }}>
        <HomeItem
          title="popular Actors"
          type="actor"
          link={`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=1`}
        />
      </div>
      {/* Actors end */}
      {/* trending */}
      <HomeItem
        title="trending day movie"
        type="movie"
        link={`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`}
      />
      <HomeItem
        title="trending day series"
        type="tv"
        link={`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&page=1`}
      />
      <HomeItem
        title="trending week movie"
        type="movie"
        link={`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=1`}
      />
      <HomeItem
        title="trending week series"
        type="tv"
        link={`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&page=1`}
      />
      {/* trending end */}
      {/* Now Playing */}
      <HomeItem
        title="Now Playing movie"
        type="movie"
        link={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`}
      />
      {/* Now Playing end */}
      {/* Trailer */}
      <Trailer />
      {/* Trailer end */}
      {/* Top Rated */}
      <HomeItem
        title="Top Rated IMDB movie"
        type="movie"
        link={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`}
      />
      <HomeItem
        title="Top Rated IMDB series"
        type="tv"
        link={`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`}
      />
      {/* Top Rated end */}
    </section>
  );
}

export default HomePage;
