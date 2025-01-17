"use client";
import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { fallbackImageUrl } from "../config";

type Props = {
  fallbackSrc: string; // Fallback image source
  src: string; // Primary image source
  alt?: string; // Alt text for the image
  width?: number; // Optional image width
  height?: number; // Optional image height
  className?: string; // Optional CSS class
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"; // Object-fit styling
};

const FallbackImage: React.FC<Props> = ({
  fallbackSrc = fallbackImageUrl,
  src,
  alt = "",
  width,
  height,
  className = "",
  objectFit = "cover", // Default object-fit
}) => {
  const [error, setError] = useState(false); // Track if there's an error with the image
  const [loading, setLoading] = useState(true); // Track if the image is loading

  useEffect(() => {
    setError(false); // Reset error state when `src` changes
  }, [src]);

  return (
    <div className="relative">
      <div className="absolute inset-0 flex justify-center items-center">
        {loading && <Skeleton className="h-full w-full" />}{" "}
        {/* Display loader when loading is true */}
      </div>
      <Image
        className="rounded-lg"
        src={error ? fallbackSrc : src} // Use fallbackSrc if error occurs
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit}
        style={{ objectFit }}
        blurDataURL={fallbackSrc}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)} // Set error state on image load failure
        priority // Preload the image if critical
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
      />
    </div>
  );
};

export default FallbackImage;
