import React from "react";
import Image from "next/image";

interface imageProps {
  src: string;
  alt: string;
}

const NextImage = ({ src, alt }: imageProps) => {
  const [isImageLoading, setImageLoading] = React.useState(true);

  return (
    <div>
      <Image
        src={src}
        alt={alt}
        fetchPriority="auto"
        fill
        onLoad={() => setImageLoading(false)}
        className={`${
          isImageLoading ? "blur" : "remove-blur"
        } h-full w-full object-center`}
        objectFit="cover"
      />
    </div>
  );
};

export default NextImage;
