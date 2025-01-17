import FilmInfo from "@/server/custom-hooks/use-film-info";
import { use } from "react";
type PageProps = {
  params: Promise<{
    tvId: string;
  }>;
};
const Page = ({ params }: PageProps) => {
  const { tvId } = use(params);
  return (
    <div>
      <FilmInfo filmId={tvId} isMovie="tv" />
    </div>
  );
};

export default Page;
