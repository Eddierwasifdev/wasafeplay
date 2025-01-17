"use client";

import React, { useState } from "react";
import useGetApi from "./use-get-api";

import Card2 from "@/components/card2";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "@/components/loader";
import { fallbackImageUrl, filmsGridUrlMovie, filmsGridUrlTv } from "../config";
import { imageUrl } from "../config";
type MovieResponse = {
  id: number;
  name: string;
  title: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
};

type Movie = {
  results: MovieResponse[];
};

function FilmGrid({ isMovie }: { isMovie: string }) {
  const [pageNum, setPageNum] = useState<number>(1);

  const apiUrl =
    isMovie === "movie"
      ? filmsGridUrlMovie(String(pageNum))
      : filmsGridUrlTv(String(pageNum));
  const { data, loading, error } = useGetApi<Movie>(apiUrl);

  if (loading)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <p>Error fetching data. Please try again later.</p>;
  if (!data || !data.results) return <p>No data available.</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage !== pageNum) {
      setPageNum(newPage);
    }
  };

  return (
    <div className="pt-10 pl-[3%] pr-[3%] md:pl-[6%] md:pr-[6%] lg:pl-[10%] lg:pr-[10%]">
      <Pagination className="select-none m-2">
        <PaginationContent>
          <PaginationItem
            className={
              pageNum === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }
            onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
          >
            <PaginationPrevious
              className={
                pageNum === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {[...Array(3)].map((_, index) => {
            const p = pageNum === 1 ? index + 1 : pageNum - 1 + index;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => handlePageChange(p)}
                  isActive={p === pageNum}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem></PaginationItem>

          <PaginationItem onClick={() => handlePageChange(pageNum + 1)}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.map((film) => (
          <Card2
            key={film.id}
            id={film.id}
            name={film.name || film.title}
            image={
              film.poster_path ? imageUrl(film.poster_path) : fallbackImageUrl
            }
            date={film.release_date || film.first_air_date || "N/A"}
            filmType={isMovie}
            fallbackSrc={fallbackImageUrl}
          />
        ))}
      </div>
      <Pagination className="select-none m-2">
        <PaginationContent>
          <PaginationItem
            className={
              pageNum === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }
            onClick={() => pageNum > 1 && setPageNum(pageNum - 1)}
          >
            <PaginationPrevious
              className={
                pageNum === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {[...Array(3)].map((_, index) => {
            const p = pageNum === 1 ? index + 1 : pageNum - 1 + index;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => handlePageChange(p)}
                  isActive={p === pageNum}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem></PaginationItem>

          <PaginationItem onClick={() => handlePageChange(pageNum + 1)}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default FilmGrid;
