"use client";
import React, { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

function OneMovieBtns() {
  const [mark, setMark] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [disLike, setDisLike] = useState<boolean>(false);

  const handleDisLike = () => {
    setDisLike(!disLike);
    setLike(false);
  };
  const handleLike = () => {
    setLike(!like);
    setDisLike(false);
  };

  return (
    <div
      className="w-full md:h-1/5 h-[10%] flex items-end justify-center gap-4"
      style={{ marginBottom: ".5rem" }}
    >
      {mark ? (
        <button className="cursor-pointer text-cyan-600" onClick={() => setMark(false)}>
          <BookmarkCheck />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => setMark(true)}>
          <Bookmark />
        </button>
      )}
      <button className="cursor-pointer">
        <Share2 />
      </button>
      <button
        className={`cursor-pointer ${like ? "text-green-500" : ""}`}
        onClick={handleLike}
      >
        <ThumbsUp />
      </button>
      <button
        className={`cursor-pointer ${disLike ? "text-rose-500" : ""}`}
        onClick={handleDisLike}
      >
        <ThumbsDown />
      </button>
    </div>
  );
}

export default OneMovieBtns;
