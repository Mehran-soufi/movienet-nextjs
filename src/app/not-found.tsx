"use client";

import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center select-none">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="lg:text-8xl md:text-4xl text-2xl font-bold text-red-500 uppercase">
          404
        </h1>
        <p className="md:text-2xl text-lg text-slate-300">
          You seem to be lost.
        </p>
        <Button
          variant="btnCustom"
          style={{ padding: ".5rem" }}
          onClick={() => router.push("/")} 
        >
          <House />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
