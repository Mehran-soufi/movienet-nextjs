import HomeItem from "@/components/home/home_Item/HomeItem";
import { tvGenresList } from "@/utils/genres";

export default function page() {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 min-h-screen" style={{ marginTop: "4rem" }}>
        <div className="w-full h-full" style={{ padding: "1rem 0" }}>
          {/* popular */}
          <HomeItem
            title="popular"
            type="tv"
            link={`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=1`}
          />
          {/* popular end */}
          {/* trending */}
          <HomeItem
            title="trending day"
            type="tv"
            link={`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&page=1`}
          />
          <HomeItem
            title="trending week"
            type="tv"
            link={`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&page=1`}
          />
          {/* trending end */}
          {/* Now Playing */}
          <HomeItem
            title="Now Playing"
            type="tv"
            link={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=1`}
          />
          {/* Now Playing end */}
          {/* Top Rated */}
          <HomeItem
            title="Top Rated IMDB"
            type="tv"
            link={`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`}
          />
          {/* Top Rated end */}
          {/* genre movie */}
          {tvGenresList.map((item, index) => (
            <HomeItem
              key={index}
              title={`${item.name}`}
              type="tv"
              link={`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${item.id}`}
            />
          ))}
          {/* genre movie end */}
        </div>
      </div>
    </section>
  );
}
