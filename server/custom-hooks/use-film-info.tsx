"use client";

import useGetApi from "./use-get-api";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Reviews from "../film-component/reviews";
import Seasons from "../film-component/seasons";
import Recommendation from "../film-component/recommendation";
import EpisodeInfo from "../film-component/episode-overview";
import Loader from "@/components/loader";
import Cast from "../film-component/cast";
import { embedUrlMovie, filmInfoUrl } from "../config";
import { embedUrlTv } from "../config";

type MovieResponse = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  seasons: [];
  episodes: [];
  overview: string;
  genres: [];
  release_date: string;
  first_air_date: string;
  runtime: number;
  tagline: string;
  production_countries: [
    {
      name: string;
    }
  ];
  production_companies: [
    {
      name: string;
    }
  ];
};

function FilmInfo({ filmId, isMovie }: { filmId: string; isMovie: string }) {
  const [season, setSeason] = useState<number>(1);
  const [episode, setEpisode] = useState<number>(1);

  const { data, loading, error } = useGetApi<MovieResponse>(
    filmId ? filmInfoUrl(isMovie, filmId) : ""
  );

  useEffect(() => {
    if (data?.seasons && data.seasons.length > 0) {
      if (data.seasons && data.seasons.length > 0) {
        setSeason(1); // Initialize state with first season if available
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.episodes && data.episodes.length > 0) {
      setEpisode(1); // Initialize state with first episode if available
    }
  }, [data]);

  if (loading)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="md:px-[5%] pt-8 dark:bg-slate-900">
      <div className="relative w-full h-full">
        <div className="flex flex-col xl:flex-row gap-5 md:justify-center md:items-center lg:justify-start lg:items-start">
          <div className="w-full">
            <div className="h-[250px] w-full md:h-[400px] md:w-[700px]  lg:h-[450px] rounded-lg p-2 md:p-0">
              <iframe
                className="w-full h-full rounded-md"
                src={
                  isMovie === "movie"
                    ? embedUrlMovie(filmId)
                    : embedUrlTv(filmId, String(season), String(episode))
                }
                allow="fullscreen; autoplay;"
                allowFullScreen
                title="Embedded Video"
              ></iframe>
            </div>
            <div className="flex flex-col gap-4">
              {isMovie === "tv" && (
                <EpisodeInfo id={filmId} season={season} episode={episode} />
              )}
              <div className="xl:block hidden">
                <Reviews id={filmId} isMovie={isMovie} />
              </div>
            </div>
          </div>

          <div className="w-full">
            <Tabs
              defaultValue={isMovie === "tv" ? "episode" : "overview"}
              className="w-full h-[500px]"
            >
              <TabsList
                className={`grid w-full   ${
                  isMovie === "tv" ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                {isMovie === "tv" && (
                  <TabsTrigger value="episode">Episode</TabsTrigger>
                )}
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cast">Cast</TabsTrigger>
              </TabsList>
              {isMovie === "tv" && (
                <TabsContent value="episode">
                  <div className="px-2">
                    <Select
                      onValueChange={(value) => setSeason(Number(value))}
                      value={String(season)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Seasons</SelectLabel>
                          {data?.seasons?.map(
                            (season: { season_number: number }) => {
                              return (
                                <SelectItem
                                  key={season.season_number}
                                  value={String(season.season_number)}
                                >
                                  Season {season.season_number}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div>
                      <Seasons
                        id={filmId}
                        season={String(season)}
                        setEpisode={setEpisode}
                      />
                    </div>
                  </div>
                </TabsContent>
              )}
              <TabsContent value="overview">
                <div className="p-2">
                  <div className="text-md font-bold">
                    {data?.name || data?.title}
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    <span className="text-sm font-light">{data?.overview}</span>
                  </div>
                  <div className="text-sm font-semibold mt-4">
                    Released:
                    <span className="text-sm font-normal">
                      {isMovie === "movie"
                        ? " " + data?.release_date
                        : " " + data?.first_air_date}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    Genres:
                    <span className="text-sm font-normal">
                      {" " +
                        data?.genres
                          .map((genre: { name: string }) => genre.name)
                          .join(", ")}
                    </span>
                  </div>
                  {isMovie === "movie" && (
                    <div className="text-sm font-semibold">
                      Duration:
                      <span className="text-sm font-normal">
                        {" " + data?.runtime + " minutes"}
                      </span>
                    </div>
                  )}
                  <div className="text-sm font-semibold">
                    Country:
                    <span className="text-sm font-normal">
                      {" " +
                        data?.production_countries
                          .map((country: { name: string }) => country.name)
                          .join(", ")}
                    </span>
                  </div>
                  <div className="text-sm font-semibold">
                    Production:
                    <span className="text-sm font-normal">
                      {" " +
                        data?.production_companies
                          .map((company: { name: string }) => company.name)
                          .join(", ")}
                    </span>
                  </div>
                  {data?.tagline && (
                    <div className="text-sm font-semibold">
                      Tagline:
                      <span className="text-sm font-normal">
                        {" " + data?.tagline}
                      </span>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cast">
                <Cast filmId={filmId} isMovie={isMovie} />
              </TabsContent>
            </Tabs>
            <div className="mt-8 p-2">
              <span className="text-sm">You may also like</span>
              <Recommendation filmId={filmId} isMovie={isMovie} />
            </div>
          </div>
        </div>
      </div>

      <div className="xl:hidden block">
        <Reviews id={filmId} isMovie={isMovie} />
      </div>
    </div>
  );
}

export default FilmInfo;
