"use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

type CommentType = {
  author: string;
  author_details: {
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
};

async function fetchComment({
  params,
}: {
  params: { id: string; type: string };
}): Promise<CommentType[]> {
  const { id, type } = params;
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments data");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

function OneMoveiComments({ id, type }: { id: string; type: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchComment({ params: { id, type } });
        setComments(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id, type]);

  if (loading || error) {
    return (
      <section
        className="lg:w-4/5 w-11/12 shadow-inner shadow-gray-800 rounded-xl"
        style={{ padding: "1rem" }}
      >
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-slate-300 font-bold txt-lg">
            Loading Comments...
          </h2>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-2 bg-gray-700 animate-pulse rounded-lg"
              style={{ padding: "1rem" }}
            >
              <div
                className="w-full flex items-center justify-between border-b border-gray-800"
                style={{ paddingBottom: ".5rem" }}
              >
                <div className="flex items-center justify-start gap-2">
                  <div className="w-14 h-14 flex justify-center items-center bg-gray-800 rounded-full"></div>
                  <div className="flex flex-col justify-center gap-2">
                    <div className="h-4 bg-gray-800 rounded w-24"></div>
                    <div className="h-3 bg-gray-800 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <div className="h-4 bg-gray-800 rounded w-6"></div>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded"></div>
              <div className="w-full h-3 bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="lg:w-4/5 w-11/12 shadow-inner shadow-gray-800 rounded-xl"
      style={{ padding: "1rem" }}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <h2 className="text-slate-300 font-bold txt-lg">Comments:</h2>
        </div>
        <div className="w-full flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-2 bg-gray-900 rounded-lg"
              style={{ padding: "1rem" }}
            >
              <div
                className="w-full flex items-center justify-between border-b border-gray-800"
                style={{ paddingBottom: ".5rem" }}
              >
                <div className="flex items-center justify-start gap-2">
                  <div className="w-14 h-14 flex justify-center items-center">
                    <img
                      src={
                        comment.author_details.avatar_path
                          ? `https://image.tmdb.org/t/p/w500${comment.author_details.avatar_path}`
                          : "/assets/noImg/no_img.jpeg"
                      }
                      alt={comment.author}
                      className="w-14 h-14 rounded-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-slate-200 font-bold">
                      {comment.author_details.username || comment.author}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <p className="text-slate-200">
                    {comment.author_details.rating || 1}
                  </p>
                  <Star size={20} className="text-amber-300" />
                </div>
              </div>
              <div className="w-full">
                <p className="text-slate-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OneMoveiComments;
