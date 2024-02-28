import { useEffect } from "react";

type BookSearchResultImgProps = {
  cover: string;
  onClick: () => void;
};

export default function BookSearchResultImg({
  cover,
  onClick,
}: BookSearchResultImgProps) {
  useEffect(() => {
    // Preload the image
    const image = new Image();
    image.src = cover;
  }, [cover]);

  return (
    <img
      onClick={onClick}
      src={cover}
      className="rounded-lg cursor-pointer"
      width={85}
      height={123}
      alt="book cover image"
    />
  );
}
