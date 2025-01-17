import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ScrollArea } from "../../components/ui/scroll-area";
import useGetApi from "../custom-hooks/use-get-api";
import Loader from "@/components/loader";

type Props = {
  id: string;
  season: string;
  setEpisode: (episode: number) => void;
};

type MovieResponse = {
  name: string;
  episode_number: string;
  still_path: string;
  overview: string;
  episodes: Array<{
    name: string;
    episode_number: string;
    still_path?: string;
    overview?: string;
  }>;
};

type WatchProgress = {
  season: string;
  episode: number;
};

const Seasons = ({ id, season, setEpisode }: Props) => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const fallbackSrc = "https://placehold.co/750x500?text=No+Image";
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const { data, loading, error } = useGetApi<MovieResponse>(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`
  );

  // Load saved progress when component mounts
  useEffect(() => {
    const loadSavedProgress = () => {
      try {
        const savedProgress = localStorage.getItem(`watchProgress-${id}`);
        console.log("Saved progress:", savedProgress); // Debugging log

        if (savedProgress) {
          const progress: WatchProgress = JSON.parse(savedProgress);
          if (progress.season === season) {
            setSelectedEpisode(progress.episode);
            setEpisode(progress.episode);
          } else {
            setSelectedEpisode(1);
            setEpisode(1);
          }
        } else {
          setSelectedEpisode(1);
          setEpisode(1);
        }
      } catch (e) {
        console.error("Error reading from localStorage:", e);
        setSelectedEpisode(1);
        setEpisode(1);
      }
    };

    loadSavedProgress();
  }, [id, season, setEpisode]);

  useEffect(() => {
    setErrors({});
  }, [selectedEpisode]);

  const handleEpisodeSelect = (episodeNumber: number) => {
    setSelectedEpisode(episodeNumber);
    setEpisode(episodeNumber);
    // Save progress to localStorage
    const progress: WatchProgress = {
      season: season,
      episode: episodeNumber,
    };
    console.log("Saving progress:", progress); // Debugging log

    try {
      localStorage.setItem(`watchProgress-${id}`, JSON.stringify(progress));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }

    if (window.innerHeight > 396) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) return <p>Error fetching data. Please try again later.</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="mt-1 p-2">
      <div>
        <ScrollArea className="h-[400px] w-full rounded-md">
          <div className="">
            {data?.episodes.map((episode, index) => (
              <React.Fragment key={index}>
                <div
                  className={clsx(
                    "text-sm cursor-pointer rounded-md p-2 transition-colors",
                    selectedEpisode === Number(episode.episode_number)
                      ? "bg-secondary-foreground text-secondary"
                      : "hover:bg-primary-foreground text-primary"
                  )}
                  onClick={() =>
                    handleEpisodeSelect(Number(episode.episode_number))
                  }>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          errors[Number(episode.episode_number)] ||
                          !episode.still_path
                            ? fallbackSrc
                            : `https://image.tmdb.org/t/p/w500/${episode.still_path}`
                        }
                        alt={episode.name}
                        width={150}
                        height={150}
                        className="rounded-md"
                        onError={() =>
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            [Number(episode.episode_number)]: true,
                          }))
                        }
                      />
                      <div>
                        <span className="text-xs block">
                          Episode {episode.episode_number}
                        </span>
                        <span className="text-sm font-semibold block">
                          {episode.name === `Episode ${episode.episode_number}`
                            ? ""
                            : episode.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* show this only in sm screen */}
                  <div className="block md:hidden">
                    <div className="flex items-center gap-2">
                      <div className="flex justify-center items-center text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-sm">
                        <span className="text-xs  block w-8">
                          Eps {episode.episode_number + " "}
                        </span>
                        <span className="">
                          {episode.name == `Eps ${episode.episode_number}`
                            ? ""
                            : " : " + episode.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Seasons;
