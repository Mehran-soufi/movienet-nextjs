import OneMovie from "@/components/oneMovie/OneMovie";

export type Genre = {
  id: number;
  name: string;
};

export type production_countrie = {
  iso_3166_1: string;
  name: string;
};

export type languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type companie = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string[];
};

export type OneMovieData = {
  id: number;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  origin_country: string[];
  original_language: string;
  budget: number;
  genres: Genre[];
  production_companies: companie[];
  production_countries: production_countrie[];
  runtime: number;
  revenue: number;
  spoken_languages: languages[];
  tagline: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  adult: boolean;
  last_episode_to_air: {
    runtime: number;
  };
};

async function fetchMovieData(
  id: string,
  type: string
): Promise<OneMovieData | null> {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en`
    );

    if (!response.ok) {
      console.error("Failed to fetch movie data");
      return null;
    }

    const movieData: OneMovieData = await response.json();
    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

type Props = {
  params: {
    type: string;
    title: string;
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { type, id } = params;

  const movieData = await fetchMovieData(id, type);

  if (!movieData) {
    throw new Error("Data could not be fetched");
  }

  return <OneMovie movieData={movieData} type={type} />;
}
