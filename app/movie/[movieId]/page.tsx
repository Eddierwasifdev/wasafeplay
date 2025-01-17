import FilmInfo from "@/server/custom-hooks/use-film-info";
import { use } from "react";
type PageProps = {
  params: Promise<{
    movieId: string;
  }>;
};
const Page = ({ params }: PageProps) => {
  const { movieId } = use(params);
  return (
    <div>
      <FilmInfo filmId={movieId} isMovie="movie" />
    </div>
  );
};

export default Page;
