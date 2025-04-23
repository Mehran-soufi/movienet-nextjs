"use client";

import React, { useEffect, useState } from "react";

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

async function fetchTrailerMovie({ params }: { params: { id: string; type: string } }): Promise<Video[]> {
  const { id, type } = params;
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trailer data");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return [];
  }
}

export default function OneMovieTrailer({ id, type }: { id: string; type: string }) {
  const [trailers, setTrailers] = useState<Video[]>([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      const trailerData = await fetchTrailerMovie({ params: { id, type } });
      const filteredTrailers = trailerData.filter((video) => video.type === "Trailer"); // بدون خطا
      setTrailers(filteredTrailers);
    };

    fetchTrailers();
  }, [id, type]);

  return (
    <div className="w-full h-full flex items-center justify-start">
      {trailers.length > 0 ? (
        trailers.slice(0, 1).map((trailer) => (
          <div key={trailer.id} className="lg:w-11/12 w-full h-full" style={{ margin: "0 auto" }}>
            {trailer.site === "YouTube" && (
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full lg:h-[450px] md:h-[350px] h-[300px]"
              ></iframe>
            )}
          </div>
        ))
      ) : (
        <p>No trailers available</p>
      )}
    </div>
  );
}