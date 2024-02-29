import { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { booksState } from "../store/booksState";
import { SortOptions } from "../lib/types";

export default function useSort() {
  const bookList = useRecoilValue(booksState);
  const [sortBy, setSortBy] = useState<SortOptions>("createdAt");

  const sortedBooks = useMemo(
    () =>
      [...bookList].sort((x, y) => {
        if (sortBy === "author") {
          return x.author > y.author ? 1 : x.author < y.author ? -1 : 0;
        } else if (sortBy === "title") {
          return x.title > y.title ? 1 : x.title < y.title ? -1 : 0;
        } else if (sortBy === "rating" && x.rating && y.rating) {
          return x.rating > y.rating ? -1 : x.rating < y.rating ? 1 : 0;
        } else return x.createdAt.seconds - y.createdAt.seconds;
      }),
    [bookList, sortBy]
  );

  return { sortedBooks, setSortBy };
}
