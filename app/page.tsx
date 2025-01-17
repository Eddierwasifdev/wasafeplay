"use client";
import Scroll from "@/app/(home)/scroll-trend";
import MovieTrend from "@/app/(home)/movie-nowplaying";
import TvNowPlaying from "@/app/(home)/tv-nowplaying";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import TvTopRated from "./(home)/tv-toprated";
import { useState } from "react";
import MovieTopRated from "./(home)/movie-toprated";
export default function Home() {
  const [type, setType] = useState("tv");

  return (
    <div className="flex flex-col justify-center items-center place-content-center px-[10%]">
      <div className="flex flex-col justify-center items-center">
        <Scroll />

        <div className="mt-10 animate-fade animate-delay-500">
          <span className="flex justify-between w-full">
            <span className="text-xl font-bold">Now Playing</span>
            <Link href="/movie">
              <span className="flex items-center hover:cursor-pointer hover:text-primary/50 transition-all duration-300">
                More <ChevronRightIcon />
              </span>
            </Link>
          </span>
          <div>
            <MovieTrend />
          </div>
        </div>
        {/* TV */}
        <div className="mt-10 animate-fade animate-delay-1000">
          <span className="flex justify-between w-full">
            <span className="text-xl font-bold">Airing Today</span>
            <Link href="/tv">
              <span className="flex items-center hover:cursor-pointer hover:text-primary/50 transition-all duration-300">
                More <ChevronRightIcon />
              </span>
            </Link>
          </span>
          <div>
            <TvNowPlaying />
          </div>
        </div>
        {/* TV TOP RATED */}
        <div className="mt-10 animate-fade animate-delay-[1500ms]">
          <span className="flex justify-between w-full">
            <span className="text-xl font-bold">Top Rated</span>
            <span className="flex gap-2">
              {["tv", "movie"].map((item) => (
                <button
                  key={item}
                  className={`hover:cursor-pointer transition-all duration-300 px-2 w-24 py-1 rounded-md ${
                    type === item
                      ? "bg-primary text-secondary" // Active button has bg-primary and white text
                      : "bg-primary/40 text-secondary hover:bg-primary/70 hover:text-white" // Inactive button is transparent with hover effect
                  }`}
                  aria-pressed={type === item}
                  onClick={() => setType(item)}>
                  {item.toUpperCase()}
                </button>
              ))}
            </span>
          </span>
          <div className="mt-2">
            <div className={type === "tv" ? "block" : "hidden"}>
              <TvTopRated />
            </div>
            <div className={type === "movie" ? "block" : "hidden"}>
              <MovieTopRated />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
