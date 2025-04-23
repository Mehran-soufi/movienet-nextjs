import HomePage from "@/components/home/Home";

async function fetchMovies() {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results || [];
}

export default async function Page() {
  const movies = await fetchMovies();

  return (
    <main className="relative">
      <>
        <HomePage movies={movies} />
      </>
    </main>
  );
}
