"use client";

import { Clapperboard, Search, Tv, User } from "lucide-react";
import useGetApi from "@/server/custom-hooks/use-get-api";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import Image from "next/image";
import { movieGenresUrl, searchUrl, tvGenresUrl } from "@/server/config";

type Keyword = {
  results: {
    name?: string;
    title?: string;
    poster_path?: string;
    media_type: string;
    id: number;
    release_date?: string;
    first_air_date?: string;
    profile_path?: string;
    genre_ids: number[];
  }[];
};

type GenreResponse = {
  genres: { id: number; name: string }[];
};

export function CommandDemo({ closeDialog }: { closeDialog: () => void }) {
  // State hooks
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const fallbackSrc = "https://placehold.co/200x300?text=No+Image";

  // Effect hooks
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch data hooks
  const { data } = useGetApi<Keyword>(searchUrl(debouncedSearch));

  // Pre-fetch genre data for movies and TV shows
  const { data: movieGenresData } = useGetApi<GenreResponse>(movieGenresUrl);
  const { data: tvGenresData } = useGetApi<GenreResponse>(tvGenresUrl);

  const movieGenres =
    movieGenresData?.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>) || {};

  const tvGenres =
    tvGenresData?.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>) || {};

  const handleImageError = (id: number) =>
    setErrors((prevErrors) => ({ ...prevErrors, [id]: true }));

  useEffect(() => setErrors({}), [data]);

  const handleLinkClick = () => {
    closeDialog();
  };

  return (
    <div>
      <div className="rounded-lg border shadow-md">
        <div className="relative">
          <Input
            className="pl-10 h-12 ring-0 border-none border-b-[1px]"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2">
            <Search />
          </span>
        </div>

        <ul className="space-y-2 h-[50vh] overflow-y-auto">
          {data?.results?.map((item) => {
            const genres =
              item.media_type === "movie"
                ? movieGenres
                : item.media_type === "tv"
                ? tvGenres
                : {};
            return (
              <li key={item.id}>
                <Link
                  href={`/${item.media_type}/${item.id}`}
                  onClick={handleLinkClick}
                >
                  <span className="flex items-center gap-4 cursor-pointer hover:bg-primary/20 rounded p-1">
                    <Image
                      src={
                        errors[item.id]
                          ? fallbackSrc
                          : `https://image.tmdb.org/t/p/w500${
                              item.media_type === "person"
                                ? item.profile_path
                                : item.poster_path
                            }`
                      }
                      alt={item.name || item.title || "Untitled"}
                      width={50}
                      height={50}
                      className="rounded-lg"
                      onError={() => {
                        handleImageError(item.id);
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-base whitespace-nowrap overflow-hidden text-ellipsis w-[60vw] md:w-[20vw]">
                        {item.name || item.title || "Untitled"}
                      </span>
                      <span className="text-xs flex items-center gap-1 ">
                        <div className="flex items-center gap-2">
                          {item.media_type === "tv" ? (
                            <div className="flex items-center gap-[2px]">
                              <Tv className="w-3 h-3" />
                              <span className="p-0 m-0">TV Show</span>
                            </div>
                          ) : item.media_type === "person" ? (
                            <div className="flex items-center gap-[2px]">
                              <User className="w-3 h-3" />
                              <span className="p-0 m-0">Person</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-[2px]">
                              <Clapperboard className="w-3 h-3" />
                              <span className="p-0 m-0">Movie</span>
                            </div>
                          )}
                        </div>

                        {item.media_type != "person" &&
                          (item.release_date || item.first_air_date
                            ? " • " +
                              (item.release_date?.split("-")[0] ||
                                item.first_air_date?.split("-")[0])
                            : " • N/A")}
                      </span>
                      <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[60vw] md:w-[20vw]">
                        {item.genre_ids
                          ?.map((id) => genres[id])
                          .filter(Boolean)
                          .join(", ") || ""}
                      </span>
                    </div>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
