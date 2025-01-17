import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetApi from "../custom-hooks/use-get-api";

interface CastProps {
  filmId: string;
  isMovie: string;
}

interface CastItem {
  id: number;
  name: string;
  profile_path?: string;
  character?: string;
}

interface CastResponse {
  cast: CastItem[];
}

const Cast = ({ filmId, isMovie }: CastProps) => {
  const fallbackSrc = "https://placehold.co/200x300?text=No+Image";
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const { data } = useGetApi<CastResponse>(
    `https://api.themoviedb.org/3/${isMovie}/${filmId}/credits?language=en-US`
  );
  const handleImageError = (id: number) =>
    setErrors((prevErrors) => ({ ...prevErrors, [id]: true }));

  useEffect(() => setErrors({}), [data]);
  const handleClick = (id: number) => router.push(`/person/${id}`);

  return (
    <div>
      <ScrollArea className="h-[400px] w-full rounded-md">
        <div className="lg:grid grid-cols-2 gap-2">
          {data?.cast?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 py-1 cursor-pointer hover:bg-secondary rounded-md transition px-2"
              onClick={() => handleClick(item.id)}
            >
              <Image
                src={
                  errors[item.id] || !item.profile_path
                    ? fallbackSrc
                    : `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                }
                alt={item.name || "Unnamed"}
                width={50}
                height={50}
                className="rounded-md"
                onError={() => handleImageError(item.id)}
              />
              <div>
                <div className="text-sm">{item.name || "Unnamed"}</div>
                <div className="text-xs">{item.character || "Unnamed"}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Cast;
