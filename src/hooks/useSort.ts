import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { booksState } from "../store/booksState";
import { SortOptions } from "../lib/types";

export default function useSort() {
  const bookList = useRecoilValue(booksState);
  const [sortBy, setSortBy] = useState<SortOptions>("createdAt");
  const [sortedBooks, setSortedBooks] = useState(
    [...(bookList || [])].sort(
      (x, y) => y.createdAt.seconds - x.createdAt.seconds
    )
  );

  useEffect(() => {
    const newBooks = [...(bookList || [])].sort((x, y) => {
      if (sortBy === "createdAt") {
        return x.createdAt.seconds - y.createdAt.seconds;
      }
      if (sortBy === "author") {
        return x.author > y.author ? 1 : x.author < y.author ? -1 : 0;
      }
      if (sortBy === "title") {
        return x.title > y.title ? 1 : x.title < y.title ? -1 : 0;
      }
      if (sortBy === "rating" && x.rating && y.rating) {
        return x.rating > y.rating ? -1 : x.rating < y.rating ? 1 : 0;
      }
      return 0;
    });
    setSortedBooks(newBooks);
  }, [bookList, sortBy]);

  return { sortedBooks, setSortBy };
}
