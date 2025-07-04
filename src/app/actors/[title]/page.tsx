import Result from "@/components/result/Result";
import { heroMovie } from "@/components/home/home_Item/HomeItemResItems";

export interface HeroPerson {
  id: number;
  name: string;
  gender: number;
  profile_path: string | null;
}

const getApiLinkByTitle = (title: string, page: number): string | null => {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;
  const lowerTitle = title.toLowerCase();

  switch (lowerTitle) {
    case "popular":
      return `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;
    case "trending day":
      return `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}&page=${page}`;
    case "trending week":
      return `https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}&page=${page}`;
    default:
      return `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;
  }
};

export default async function ActorsPage({
  params,
  searchParams,
}: {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { title } = await params;
  const { page } = await searchParams;

  const decodedTitle = decodeURIComponent(title);
  const pageNumber = Number(page) || 1;

  const apiUrl = getApiLinkByTitle(decodedTitle, pageNumber);
  if (!apiUrl) {
    throw new Error("Internal Server Error");
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Internal Server Error");
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
              currentPage={pageNumber}
            />
          </div>
        </div>
      </section>
    );
  } catch {
    throw new Error("Internal Server Error");
  }
}
