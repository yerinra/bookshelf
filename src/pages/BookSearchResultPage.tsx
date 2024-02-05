import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { booksState } from "../store/booksState";
import SkeletonSearchResult from "../components/SkeletonSearchResult";

const BookSearchResultPage = () => {
  const { keyword } = useParams();
  const { isLoading, hasNextPage, fetchNextPage, data } = useBooks(keyword);
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const [selectedBook, setSelectedBook] = useState(null);
  // const [bookList, setBookList] = useState([]);
  const finalData = data?.pages.map((v) => v.item)[0];

  const scrollRef = useInfiniteScroll({
    isLoading,
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
          const mapped = doc?.docs?.map((doc) => doc?.data());
          setBookList(mapped);
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser) getAllBooks();
  }, [currentUser, selectedBook]);

  const handleAdd = async (isbn13, title, author, cover) => {
    try {
      await setDoc(doc(db, "users", currentUser, "books", isbn13), {
        title,
        author,
        cover,
        isbn13,
        hashtags: [],
        itemPage: 1000,
      });
    } catch (err) {
      console.error(err);
    }
    setSelectedBook(bookList?.filter((v) => v.isbn13 == isbn13)[0]);
  };

  return (
    <>
      <main className="flex-col p-10">
        {isLoading && <SkeletonSearchResult />}
        {data &&
          finalData?.length > 0 &&
          data?.pages.map((v) =>
            v.item.map((val, i) => (
              <BookCard book={val} key={i} handleAdd={handleAdd} />
            ))
          )}
        {finalData?.length == 0 && <div>no data</div>}
      </main>
      <div ref={scrollRef} />
    </>
  );
};
export default BookSearchResultPage;
