import { useRef, useEffect } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

type InfiniteScrollProps = {
  isLoading: boolean | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  isFetchingNextPage: boolean | undefined;
};

const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: InfiniteScrollProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback);

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }
  }, [isLoading, fetchNextPage, hasNextPage, isFetchingNextPage]);
  return scrollRef;
};

export default useInfiniteScroll;
