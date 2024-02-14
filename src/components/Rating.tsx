import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../service/firebase";
import { useRecoilState } from "recoil";
import { ratingState } from "../store/ratingState";

type RatingProps = {
  isbn13: string;
  savedRating: number;
  updateRating: (isbn13: string, num: number) => Promise<void>;
};
export default function Rating({
  isbn13,
  savedRating,
  updateRating,
}: RatingProps) {
  // const [rating, setRating] = useRecoilState(ratingState);
  const [rating, setRating] = useState(savedRating);

  useEffect(() => {
    updateRating(isbn13, rating);
  }, [rating]);
  return (
    <section className="flex gap-0.25 px-3">
      {[...Array(rating)].map((_, i) => (
        <StarFilledIcon
          key={i}
          onClick={() => {
            if (i + 1 === rating) {
              setRating(0);
            } else {
              setRating(i + 1);
            }
          }}
          className="text-accent cursor-pointer"
        />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <StarIcon
          key={i}
          onClick={() => setRating(rating + i + 1)}
          className="text-l-text-secondary cursor-pointer"
        />
      ))}
    </section>
  );
}
