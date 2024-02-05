import { useRef, useEffect } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

type InfiniteScrollProps = {
  isLoading: boolean | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

// const useInfiniteScroll = ({
//   isLoading,
//   hasNextPage,
//   fetchNextPage,
// }: ioProps) => {
//   const io = useRef<IntersectionObserver | null>(null);
//   const scrollRef = useCallback(
//     (target: HTMLElement) => {
//       if (isLoading) return;

//       if (io.current) io.current.disconnect();

//       io.current = new IntersectionObserver((target) => {
//         if (target[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       });

//       if (target) io.current.observe(target);
//     },
//     [fetchNextPage, hasNextPage, isLoading]
//   );

//   return scrollRef;
// };

// export default useInfiniteScroll;

const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
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
  }, [isLoading, fetchNextPage, hasNextPage]);
  return scrollRef;
};

export default useInfiniteScroll;
