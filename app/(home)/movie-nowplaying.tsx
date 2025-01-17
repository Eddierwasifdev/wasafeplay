"use client";
import Card2 from "@/components/card2";
import { nowPlayingUrl } from "@/server/config";
import useGetApi from "@/server/custom-hooks/use-get-api";
import React from "react";

interface MovieNowPlaying {
  results: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    media_type: string;
    name: string;
    first_air_date: string;
  }[];
}

const MovieNowPlaying = () => {
  const { data } = useGetApi<MovieNowPlaying>(nowPlayingUrl);

  return (
    <div className="grid grid-cols-3 md:grid-cols-9 gap-2 ">
      {data?.results.slice(0, 9).map((film) => (
        <div key={film.id}>
          <Card2
            key={film.id}
            id={film.id}
            name={film.name || film.title}
            image={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : "https://placehold.co/500x750?text=No+Image"
            }
            date={film.release_date || film.first_air_date || "N/A"}
            filmType={"movie"}
            fallbackSrc="https://placehold.co/500x750?text=No+Image"
          />
        </div>
      ))}
    </div>
  );
};

export default MovieNowPlaying;
