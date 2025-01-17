"use client";
import React, { useState } from "react";
import useGetApi from "./use-get-api";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/loader";
import { fallbackImageUrl } from "../config";
import { imageUrl } from "../config";

type PersonInfoProps = {
  personId: string; // The ID of the person
};

type PersonData = {
  name: string;
  biography: string;
  profile_path: string;
  known_for_department: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
};

type MovieCredits = {
  cast: {
    id: number;
    title?: string;
    name?: string; // For TV shows, the field is `name` instead of `title`
    release_date?: string;
    poster_path?: string; // Added poster_path for better error handling
  }[];
};

type TvCredits = {
  cast: {
    id?: number;
    name?: string;
    poster_path?: string;
  }[];
};

function PersonInfo({ personId }: PersonInfoProps) {

  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  // Fetch person details
  const { data, loading } = useGetApi<PersonData>(
    `https://api.themoviedb.org/3/person/${personId}?language=en-US`
  );

  // Fetch movie credits for the person
  const { data: movieCredits } = useGetApi<MovieCredits>(
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`
  );
  const { data: tvCredits } = useGetApi<TvCredits>(
    `https://api.themoviedb.org/3/person/${personId}/tv_credits?language=en-US`
  );

  if (loading)
    return (
      <div className="inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row mt-8 gap-10 px-3 md:px-10">
      {/* Person Image Section */}
      <div className="flex justify-center items-center w-full lg:w-1/3">
        <Image
          src={
            error
              ? "https://placehold.co/500x750?text=No+Image"
              : `https://image.tmdb.org/t/p/w500${data?.profile_path}`
          }
          alt={data?.name || "Profile"}
          width={300}
          height={300}
          onError={handleError}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Person Info Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        <p className="text-sm mt-2">
          {data?.biography || "No biography available."}
        </p>
        <h2 className="mt-4">Movies:</h2>
        <div className="flex overflow-x-auto w-[100vw] md:w-[50vw] gap-5">
          {movieCredits?.cast?.length && movieCredits?.cast?.length > 0 ? (
            movieCredits?.cast?.map((movie, index) => (
              <Link href={`/movie/${movie.id}`} key={index} className="w-24">
                <div className="relative w-24 h-40">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/path/to/default-image.jpg" // Fallback image for missing poster
                    }
                    alt={movie.title || movie.name || "No title"}
                    width={300}
                    height={300}
                    className="rounded-lg"
                    sizes="100vw"
                  />
                </div>
                <div className="text-sm mt-2 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {movie.title || movie.name}
                </div>
              </Link>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>

        <h2 className="mt-4">TV Shows:</h2>
        <div className="flex overflow-x-auto w-[100vw] md:w-[50vw] gap-5">
          {tvCredits?.cast?.length && tvCredits?.cast?.length > 0 ? (
            tvCredits?.cast?.map((tv, index) => (
              <Link href={`/tv/${tv.id}`} key={index} className="w-24">
                <div className="relative w-24 h-40">
                  <Image
                    src={
                      tv.poster_path
                        ? imageUrl(tv.poster_path)
                        : fallbackImageUrl
                    }
                    alt={tv.name || ""}
                    width={300}
                    height={300}
                    className="rounded-lg"
                    sizes="100vw"
                  />
                </div>
                <div className="text-sm mt-2 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {tv.name || ""}
                </div>
              </Link>
            ))
          ) : (
            <p>No TV shows found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonInfo;
