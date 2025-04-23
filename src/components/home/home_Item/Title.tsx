import Link from "next/link";
import React from "react";

function Title({ title, type }: { title: string; type: string }) {
  return (
    <div className="w-full" style={{ padding: "1rem 0" }}>
      <Link
        href={`${
          type === "movie" ? "/movies" : type === "tv" ? "/series" : "/actors"
        }/${encodeURIComponent(title)}`}
        target="_blank"
        className="font-bold text-lg uppercase text-slate-300
         transition duration-300 ease-linear hover:text-rose-400
         focus:text-rose-400 active:text-red-400"
      >
        {title} {type}
      </Link>
    </div>
  );
}

export default Title;
