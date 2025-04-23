import React from "react";
import HeroRes from "./HeroRes";
import { HomeHeroType } from "../Home";

function Hero({ movies }: { movies: HomeHeroType[] }) {
  return <HeroRes movies={movies} />;
}

export default Hero;
