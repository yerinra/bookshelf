import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../api/aladin";

const useBook = (isbn13: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["book", isbn13],
    queryFn: () => fetchBook(isbn13),
    select: (data) => data?.data.item,
  });

  return { data, isLoading, isError };
};

export default useBook;
