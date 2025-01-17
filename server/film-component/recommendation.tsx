import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetApi from "../custom-hooks/use-get-api";
import Loader from "@/components/loader";

interface RecommendationProps {
  filmId: string;
  isMovie: string;
}

interface RecommendationItem {
  id: number;
  title?: string; // Optional for movies
  name?: string; // Optional for TV shows
  backdrop_path?: string; // Optional, might not exist in all items
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
}

interface RecommendationResponse {
  results: RecommendationItem[];
}

type GenreResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};

const Recommendation = ({ filmId, isMovie }: RecommendationProps) => {
  const fallbackSrc = "https://placehold.co/750x500?text=No+Image";
  const [errors, setErrors] = useState<Record<number, boolean>>({}); // Track errors per image
  const router = useRouter();
  const { data, loading } = useGetApi<RecommendationResponse>(
    `https://api.themoviedb.org/3/${isMovie}/${filmId}/recommendations?language=en-US&page=1`
  );

  const handleClick = (id: number) => {
    router.push(`/${isMovie}/${id}`);
  };

  useEffect(() => {
    setErrors({}); // Reset errors when data changes
  }, [data]);

  const GENRES_URL = `https://api.themoviedb.org/3/genre/tv/list?language=en-US`;
  const { data: genresData } = useGetApi<GenreResponse>(GENRES_URL);

  const genreMap = genresData?.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {} as Record<number, string>);

  const handleImageError = (id: number) => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
  };
  if (loading)
    return (
      <div className=" inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <div>
      <ScrollArea className="h-full w-full rounded-md">
        {data?.results?.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 py-1 cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            <Image
              src={
                errors[item.id] || !item.backdrop_path
                  ? fallbackSrc
                  : `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
              }
              alt={item.title || item.name || "No title"}
              width={200}
              height={200}
              className="rounded-md"
              onLoad={() => {
                <Loader />;
              }}
              onError={() => handleImageError(item.id)} // Handle error per image
            />

            <div>
              <div className="text-sm font-semibold block">
                {item.title || item.name || "Untitled"}
              </div>
              <div className="text-xs">
                {item.release_date || item.first_air_date || "N/A"}
              </div>
              <div className="text-xs">
                {item.genre_ids
                  ?.map((id) => genreMap?.[id])
                  .filter(Boolean)
                  .join(", ") || ""}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Recommendation;
