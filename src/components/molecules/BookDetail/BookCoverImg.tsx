import { useEffect } from "react";

type BookCoverImgProps = {
  bookCover: string;
};

export default function BookCoverImg({ bookCover }: BookCoverImgProps) {
  useEffect(() => {
    // Preload the image
    const image = new Image();
    image.src = bookCover;
  }, [bookCover]);

  return (
    <img
      width={200}
      height={300}
      src={bookCover}
      alt="book cover image"
      className="rounded-lg max-w-[200px] mx-auto  mb-8 object-cover"
    />
  );
}
