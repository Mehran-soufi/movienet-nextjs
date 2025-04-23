import Result from "@/components/result/Result";
import { notFound } from "next/navigation";
import { movieGenresList } from "@/utils/genres";
import { heroMovie } from "@/components/home/home_Item/HomeItemResItems";

const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

const getApiLinkByTitle = (title: string, page: number): string | null => {
  const lowerTitle = title.toLowerCase();

  switch (lowerTitle) {
    case "popular":
      return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
    case "trending day":
      return `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`;
    case "trending week":
      return `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;
    case "now playing":
      return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
    case "top rated imdb":
      return `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`;
    default:
      const genre = movieGenresList.find(
        (g) => g.name.toLowerCase() === lowerTitle
      );
      if (genre) {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}&page=${page}`;
      }
      return null;
  }
};

export default async function MoviePage({
  params,
  searchParams,
}: {
  params: { title: string };
  searchParams: { page?: string };
}) {
  const title = decodeURIComponent(params.title);
  const page = Number(searchParams.page) || 1;

  const apiUrl = getApiLinkByTitle(title, page);
  if (!apiUrl) {
    return notFound();
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return notFound();
    }

    const data = await response.json();
    const results: heroMovie[] = data.results;
    const totalPages: number = data.total_pages;

    return (
      <section className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 min-h-screen" style={{ marginTop: "4rem" }}>
        <div className="w-full h-full" style={{ padding: "1rem 0" }}>
        <Result
          result={results}
          title={title}
          totalPages={totalPages}
          currentPage={page}
        />
        </div>
      </div>
    </section>
    );
  } catch (error) {
    return notFound();
  }
}
