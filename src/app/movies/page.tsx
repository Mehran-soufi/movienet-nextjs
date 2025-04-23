import HomeItem from "@/components/home/home_Item/HomeItem";
import { movieGenresList } from "@/utils/genres";

export default function page() {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 min-h-screen" style={{ marginTop: "4rem" }}>
        <div className="w-full h-full" style={{ padding: "1rem 0" }}>
          {/* popular */}
          <HomeItem
            title="popular"
            type="movie"
            link={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`}
          />
          {/* popular end */}
          {/* trending */}
          <HomeItem
            title="trending day"
            type="movie"
            link={`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`}
          />
          <HomeItem
            title="trending week"
            type="movie"
            link={`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=1`}
          />
          {/* trending end */}
          {/* Now Playing */}
          <HomeItem
            title="Now Playing"
            type="movie"
            link={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`}
          />
          {/* Now Playing end */}
          {/* Top Rated */}
          <HomeItem
            title="Top Rated IMDB"
            type="movie"
            link={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`}
          />
          {/* Top Rated end */}
          {/* genre movie */}
          {movieGenresList.map((item, index) => (
            <HomeItem
              key={index}
              title={`${item.name}`}
              type="movie"
              link={`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${item.id}`}
            />
          ))}
          {/* genre movie end */}
        </div>
      </div>
    </section>
  );
}
