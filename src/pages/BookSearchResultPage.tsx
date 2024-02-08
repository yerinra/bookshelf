import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import SkeletonSearchResult from "../components/SkeletonSearchResult";
import { Book } from "../lib/types";
import useUpdatedBooks from "../hooks/useUpdatedBooks";

export default function BookSearchResultPage() {
  const { keyword } = useParams();
  const { isLoading, hasNextPage, fetchNextPage, data } = useBooks(keyword);
  const currentUser = useRecoilValue(userState);

  const finalData: Book[] = data?.pages.map((v) => v.item)[0];

  const scrollRef = useInfiniteScroll({
    isLoading,
    hasNextPage,
    fetchNextPage,
  });

  useUpdatedBooks();

  const handleAdd = async (
    isbn13: string,
    title: string,
    author: string,
    cover: string
  ) => {
    try {
      if (currentUser) {
        await setDoc(doc(db, "users", currentUser, "books", isbn13), {
          title,
          author,
          cover,
          isbn13,
          hashtags: [],
          itemPage: 1000,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main className="flex-col p-10">
        {isLoading && <SkeletonSearchResult />}
        {data &&
          finalData?.length > 0 &&
          data?.pages.map((page) =>
            page.item.map((book: Book) => (
              <BookCard book={book} key={book.isbn13} handleAdd={handleAdd} />
            ))
          )}
        {finalData?.length == 0 && <div>검색 결과가 없습니다.</div>}
      </main>
      <div ref={scrollRef} />
    </>
  );
}
