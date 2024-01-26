import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooksData } from "../api/aladin";
import { useEffect, useState } from "react";

export const useBooksQuery = (keyword) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    isError,
    data,
  } = useInfiniteQuery({
    queryKey: ["books", keyword],
    queryFn: ({ pageParam }) => fetchBooksData(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.data.length === 0 ? undefined : nextPage;
    },
    select: (data) => ({
      pages: data?.pages.flatMap((page) => page.data),
      pageParams: data.pageParams,
    }),
  });
  return {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    isError,
    data,
  };
};
