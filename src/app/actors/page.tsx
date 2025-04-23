import HomeItem from "@/components/home/home_Item/HomeItem";

export default function page() {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 min-h-screen" style={{ marginTop: "4rem" }}>
        <div className="w-full h-full" style={{ padding: "1rem 0" }}>
          {/* popular */}
          <HomeItem
            title="popular"
            type="actor"
            link={`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=1`}
          />
          {/* popular end */}
          {/* trending */}
          <HomeItem
            title="trending day"
            type="actor"
            link={`https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}&page=1`}
          />
          <HomeItem
            title="trending week"
            type="actor"
            link={`https://api.themoviedb.org/3/trending/person/week?api_key=${apiKey}&page=1`}
          />
          {/* trending end */}
        </div>
      </div>
    </section>
  );
}
