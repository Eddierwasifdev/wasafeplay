import FilmGrid from "@/server/custom-hooks/use-films-grid";
import React from "react";

const page = () => {
  return (
    <div>
      <FilmGrid isMovie="tv" />
    </div>
  );
};

export default page;
