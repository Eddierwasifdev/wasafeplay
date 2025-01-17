import React, { useState } from "react";
import useGetApi from "../custom-hooks/use-get-api";

interface EpisodeInfoProps {
  id: string;
  season: number;
  episode: number;
}

const EpisodeInfo: React.FC<EpisodeInfoProps> = ({ id, season, episode }) => {
  const [isOverviewVisible, setIsOverviewVisible] = useState<boolean>(true);

  const EPISODE_API_URL = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?language=en-US`;
  const { data, error } = useGetApi<{
    name: string;
    overview: string;
  }>(EPISODE_API_URL);

  const toggleOverviewVisibility = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  if (error) return <p>Error fetching episode details.</p>;

  return (
    <div>
      <div className="text-xl font-semibold  px-3 w-[90vw] md:w-[700px] ">
        S{season}E{episode} | {data?.name || "Untitled Episode"}
      </div>
      {data?.overview && (
        <>
          {/* For larger screens */}
          <div className="mt-2  rounded-md hidden lg:block px-3">
            {data.overview}
          </div>

          {/* For smaller screens */}
          <div className="lg:hidden" onClick={toggleOverviewVisibility}>
            {isOverviewVisible ? (
              <div className="px-3 w-[90vw]  rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis md:w-[700px]">
                {data.overview}
              </div>
            ) : (
              <div className="px-3 rounded-md cursor-pointer">
                {data.overview}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EpisodeInfo;
