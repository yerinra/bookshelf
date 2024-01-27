import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../api/aladin";
import { AxiosError, AxiosResponse } from "axios";

const useBook = (isbn13: string) => {
  const { data, isLoading, isError } = useQuery<AxiosResponse, AxiosError>({
    queryKey: ["book", isbn13],
    queryFn: () => fetchBook(isbn13),
    select: (data) => data?.data.item,
  });

  return { data, isLoading, isError };
};

export default useBook;
