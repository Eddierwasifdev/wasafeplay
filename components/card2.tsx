"use client";
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import FallbackImage from "@/server/custom-hooks/fallback-image";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  image: string;
  id: number;
  date: string;
  filmType: string;
  fallbackSrc: string; // Fallback image URL
};

// Helper function to extract the year from the date
const extractYear = (date: string) => date.split("-")[0] || "Unknown";

const Card2: React.FC<Props> = ({
  name,
  image,
  id,
  filmType,
  date,
  fallbackSrc,
}) => {
  const pathname = usePathname();
  const dateUpload = extractYear(date); // Extract year using helper function
  return (
    <div>
      <Link href={`/${filmType}/${id}`} aria-label={`View details of ${name}`}>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="relative">
            {/* FallbackImage component */}
            <div>
              <FallbackImage
                className="rounded-md object-cover w-full h-full"
                src={image}
                fallbackSrc={fallbackSrc}
                alt={name}
                width={500}
                height={750}
                objectFit="cover"
              />
            </div>
          </div>
        </Card>
        <div className="text-xs font-medium ml-1 whitespace-nowrap overflow-hidden text-ellipsis w-full mt-2">
          {pathname !== "/" && <span className="">{dateUpload} &bull; </span>}
          <span className="">{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default Card2;
