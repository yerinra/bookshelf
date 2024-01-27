import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const BookSearchResultPage: React.FC = (): JSX.Element => {
  const { keyword } = useParams();
  const { isLoading, hasNextPage, fetchNextPage, data } = useBooks(keyword);
  const finalData = data?.pages.map((v) => v.item)[0];
  const { setRef } = useInfiniteScroll({ hasNextPage, fetchNextPage });
  return (
    <>
      <main className="flex-col p-10">
        {isLoading && <div>loading...</div>}
        {data &&
          finalData?.length > 0 &&
          data?.pages.map((v) =>
            v.item.map((val, i) => <BookCard book={val} key={i} />)
          )}
        {finalData?.length == 0 && <div>no data</div>}
      </main>
      <div ref={setRef} />
    </>
  );
};
export default BookSearchResultPage;
