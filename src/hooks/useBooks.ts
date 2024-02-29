import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooksData } from "../api/aladin";

const useBooks = (keyword: string = "") => {
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    data,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["books", keyword],
    queryFn: ({ pageParam }) => fetchBooksData(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.data.length === 0 ? undefined : nextPage;
    },
    select: (data) => ({
      pages: data?.pages.flatMap((page) => page?.data),
      pageParams: data.pageParams,
    }),
  });

  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    data,
    isFetchingNextPage,
  };
};

export default useBooks;
