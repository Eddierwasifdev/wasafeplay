import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetApi from "../custom-hooks/use-get-api";
import { UserRound } from "lucide-react";

type ReviewsResponse = {
  results: {
    id: string;
    author: string;
    content: string;
    created_at: string;
    author_details: {
      avatar_path?: string;
    };
  }[];
};

const Reviews = ({ id, isMovie }: { id: string; isMovie: string }) => {
  const REVIEWS_URL = `https://api.themoviedb.org/3/${isMovie}/${id}/reviews?language=en-US`;
  const { data, error } = useGetApi<ReviewsResponse>(REVIEWS_URL);

  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  const handleToggleExpand = (index: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const timeDifference = now.getTime() - createdAt.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="mt-4 p-2">
      {data?.results?.length ? (
        <div>
          <span className="p-4">
            {data.results.length} Review{data.results.length > 1 ? "s" : ""}
          </span>
          {data.results
            .sort(
              (a: { created_at: string }, b: { created_at: string }) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            ) // Sort by latest
            .map((rev: ReviewsResponse["results"][number], index: number) => {
              const timeAgo = getTimeAgo(rev.created_at);
              const isExpanded = expandedReviews[index];
              const content = isExpanded
                ? rev.content
                : rev.content.split("\n").slice(0, 3).join("\n");

              const avatarPath = rev.author_details.avatar_path
                ? rev.author_details.avatar_path.startsWith("/http")
                  ? rev.author_details.avatar_path.slice(1) // TMDB external avatar fix
                  : `https://image.tmdb.org/t/p/w200${rev.author_details.avatar_path}`
                : "";

              return (
                <div key={rev.id} className="my-5">
                  <div className="flex gap-4">
                    <Avatar>
                      {avatarPath ? (
                        <AvatarImage src={avatarPath} alt={rev.author} />
                      ) : (
                        <AvatarFallback>
                          <UserRound />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-bold">
                        {rev.author} &bull;{" "}
                        <span className="text-xs font-light">{timeAgo}</span>
                      </h3>
                      <div className="text-xs bg-primary-foreground text-primary   rounded-md p-2 my-1">
                        <p
                          className={`whitespace-pre-line ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {content}
                        </p>
                        {(rev.content.split("\n").length > 3 ||
                          rev.content.length > 300) && (
                          <button
                            className="hover:underline font-bold text-gray-400"
                            onClick={() => handleToggleExpand(index)}
                          >
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text-gray-500"></p>
      )}
    </div>
  );
};

export default Reviews;
