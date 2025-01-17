"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useGetApi from "@/server/custom-hooks/use-get-api"; // Custom hook to fetch API
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { trendingUrl } from "@/server/config";

type TrendingResponse = {
  results: {
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    poster_path: string;
  }[];
};

const Scroll = () => {
  const { data, error } = useGetApi<TrendingResponse>(trendingUrl);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-[95vw] md:w-[90vw] xl:w-[70vw] overflow-hidden mt-5 ">
      {/* Previous Button */}
      {showPrev && (
        <button
          className="absolute z-10 p-2 rounded-3xl bg-trasparen h-full text-white transform -translate-y-1/2 top-1/2"
          onClick={handlePrev}>
          <ChevronLeft />
        </button>
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide scrollbart">
        {data?.results.map((item, index) => (
          <Link
            key={item.id}
            href={`/${item.media_type}/${item.id}`}
            className="flex-shrink-0 w-24 md:w-40">
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name || "Unknown"}
                className="w-full h-auto rounded-lg"
                width={500}
                height={750}
              />
              <div className="absolute text-stroke bottom-0 text-black pb-1 pl-4 text-3xl font-bold">
                {index + 1}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {showNext && (
        <button
          className="absolute right-0 z-10 p-2 rounded-3xl bg-trasparent h-full text-white transform -translate-y-1/2 top-1/2"
          onClick={handleNext}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default Scroll;
