"use client";
import React from "react";
import GenreItems from "./GenreItems";

import { movieGenresList } from "@/utils/genres";
import { tvGenresList } from "@/utils/genres";
function Genre() {
  return (
    <div className="w-full">
      <GenreItems title="movie genres" genresList={movieGenresList} type="movies" />
      <GenreItems title="tv genres" genresList={tvGenresList} type="series" />
    </div>
  );
}

export default Genre;
