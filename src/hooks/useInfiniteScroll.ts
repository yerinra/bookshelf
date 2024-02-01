import { useRef, useCallback } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface ioProps {
  isLoading: boolean | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: ioProps) => {
  const io = useRef(null);
  const scrollRef = useCallback(
    (target: HTMLElement) => {
      if (isLoading) return;

      if (io.current) io.current.disconnect();

      io.current = new IntersectionObserver((target) => {
        if (target[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (target) io.current.observe(target);
    },
    [fetchNextPage, hasNextPage]
  );

  return scrollRef;
};

export default useInfiniteScroll;
