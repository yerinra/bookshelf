import { useState, useEffect } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface ioProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

const useInfiniteScroll = ({ hasNextPage, fetchNextPage }: ioProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCallback, target]);

  return { setTarget };
};
export default useInfiniteScroll;
