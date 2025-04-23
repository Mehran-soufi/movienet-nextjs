"use client";

import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function BackToUp() {
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);

  const handleUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showBtn && (
        <div
          className="fixed bottom-2 right-2 z-30 w-10 h-10 rounded-full bg-gray-900 shadow-inner shadow-rose-900 animate-fadeIn"
        >
          <button
            className="w-full h-full flex justify-center items-center cursor-pointer "
            onClick={handleUp}
          >
            <ChevronUp />
          </button>
        </div>
      )}
    </>
  );
}

export default BackToUp;    