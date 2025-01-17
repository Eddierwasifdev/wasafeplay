import PersonInfo from "@/server/custom-hooks/person-info";
import { use } from "react";
type PageProps = {
  params: Promise<{
    personId: string;
  }>;
};
const Page = ({ params }: PageProps) => {
  const { personId } = use(params);
  return (
    <div>
      <PersonInfo personId={personId} />
    </div>
  );
};

export default Page;
