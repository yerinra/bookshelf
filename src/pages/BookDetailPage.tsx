import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { booksState } from "../store/booksState";
import SkeletonBookDetail from "../components/organisms/Skeletons/SkeletonBookDetail";
import { BookInfo } from "../lib/types";
import useUpdatedBooks from "../hooks/useUpdatedBooks";
import BookMetaData from "../components/molecules/BookDetail/BookMetaData";

const BookDetailPage = () => {
  const { isbn } = useParams();
  const currentUser = useRecoilValue(userState);
  const bookList = useRecoilValue(booksState);
  const { isLoading, data } = useBook(isbn);

  const selectedData = data?.map((v: BookInfo) => {
    return {
      author: v.author,
      title: v.title,
      cover: v.cover,
      description: v.description,
      isbn13: v.isbn13,
      itemPage: v?.subInfo?.itemPage,
    };
  });

  useUpdatedBooks();

  const handleAdd = async () => {
    try {
      if (currentUser && isbn) {
        await setDoc(doc(db, "users", currentUser, "books", isbn), {
          title: selectedData[0].title,
          author: selectedData[0].author,
          cover: selectedData[0].cover,
          isbn13: isbn,
          hashtags: [],
          rating: 0,
          itemPage: selectedData[0].itemPage,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (currentUser && isbn) {
        await deleteDoc(doc(db, "users", currentUser, "books", isbn));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    if (isbn) {
      if (bookList?.map((v) => v.isbn13).includes(isbn)) {
        handleDelete();
      } else {
        handleAdd();
      }
    }
  };

  return (
    <main className="mt-16 mx-20 flex">
      {isLoading && <SkeletonBookDetail />}

      {selectedData &&
        selectedData.map((data: BookInfo) => (
          <section key={data.isbn13} className="flex flex-col gap-8">
            {isbn && (
              <BookMetaData
                book={data}
                added={bookList?.map((v) => v.isbn13).includes(isbn)}
                handleClick={handleClick}
              />
            )}
          </section>
        ))}
    </main>
  );
};

export default BookDetailPage;
