"use client";
import React, { useEffect, useState } from "react";
import OneActorCastRes from "./OneActorCastRes";
import { heroMovie, SkeletonLoader } from "../home/home_Item/HomeItemResItems";

export async function fetchOneActorCast({ actorId }: { actorId: number }) {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apiKey}`
    );

    if (!response.ok) {
      console.error(`Error fetching actor credits: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.cast || [];
  } catch (error) {
    console.error("Network error:", error);
    return [];
  }
}

function OneActorCast({ actorId }: { actorId: number }) {
  const [actorCast, setActorCast] = useState<heroMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchActorCast = async () => {
      try {
        setLoading(true);
        const data = await fetchOneActorCast({ actorId });
        setActorCast(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchActorCast();
  }, [actorId]);

  if (loading || error) {
    return (
      <div className="w-full h-[40vh] flex flex-wrap justify-center items-center gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="lg:w-1/6 sm:w-1/3 w-11/12 h-[40vh]" key={index}>
            <SkeletonLoader />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-11/12">
      <OneActorCastRes actorCast={actorCast} />
    </div>
  );
}

export default OneActorCast;
