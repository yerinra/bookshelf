import { Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
// import BookSearchResultCard from "../components/organisms/BookSearchResultCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import SkeletonSearchResult from "../components/organisms/Skeletons/SkeletonSearchResult";
import { Book } from "../lib/types";
import useBookShelfBooks from "../hooks/useBookShelfBooks";
import NoResult from "../components/molecules/BookSearchResult/NoResult";
import { SEOMetaTags } from "../components/molecules/SEOMetaTags";
import Spinner from "../components/molecules/Spinner";

const BookSearchResultCard = lazy(
  () => import("../components/organisms/BookSearchResultCard")
);

export default function BookSearchResultPage() {
  const { keyword } = useParams();
  const { isLoading, hasNextPage, fetchNextPage, data, isFetchingNextPage } =
    useBooks(keyword);
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  const finalData: Book[] = data?.pages.map((v) => v.item)[0];

  const scrollRef = useInfiniteScroll({
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  useBookShelfBooks();

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
          rating: 0,
          createdAt: serverTimestamp(),
        });
      } else {
        if (currentUser === null) {
          alert("로그인하셔야 합니다.");
          navigate("/login");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (isbn13: string) => {
    try {
      if (currentUser) {
        await deleteDoc(doc(db, "users", currentUser, "books", isbn13));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SEOMetaTags
        title={`${keyword} 검색 결과 - BOOK:SHELF`}
        desc="책 검색 결과 페이지입니다."
      />
      <main className="flex-col p-10">
        {isLoading && <Spinner />}
        {data &&
          finalData?.length > 0 &&
          data?.pages.map((page) =>
            page.item
              .filter((p: Book) => p.isbn13)
              .map((book: Book) => (
                <Suspense key={book.isbn13} fallback={<SkeletonSearchResult />}>
                  <BookSearchResultCard
                    book={book}
                    key={book.isbn13}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                  />
                </Suspense>
              ))
          )}
        {isFetchingNextPage && <SkeletonSearchResult />}
        {finalData?.length == 0 && <NoResult />}
      </main>
      <div ref={scrollRef} />
    </>
  );
}
