import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../store/userState";
import { booksState } from "../store/booksState";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import SkeletonBookDetail from "../components/SkeletonBookDetail";
import { Book, BookInfo } from "../lib/types";
import useUpdatedBooks from "../hooks/useUpdatedBooks";
import Button from "../components/button/Button";

const BookDetailPage = () => {
  const { isbn } = useParams();
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
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
    <section className="mt-16 mx-20">
      {isLoading && <SkeletonBookDetail />}

      {selectedData &&
        selectedData.map((data: BookInfo) => (
          <div key={data.isbn13} className="flex flex-col md:flex-row gap-8">
            <img
              src={data.cover}
              alt="book cover image"
              className="rounded-lg max-w-[240px] mx-auto"
            />
            <div className="flex flex-col gap-3 text-start">
              <p className="font-extrabold text-2xl">{data.title}</p>
              <p className="text-neutral-400">{data.author}</p>
              <p>{data.description}</p>
              <p>총 {data.itemPage}쪽</p>

              {isbn && bookList?.map((v) => v.isbn13).includes(isbn) ? (
                <DefaultButton handleClick={handleClick} />
              ) : (
                <AddedButton handleClick={handleClick} />
              )}
            </div>
          </div>
        ))}
    </section>
  );
};

export default BookDetailPage;

type ButtonProps = {
  handleClick: () => void;
};

function DefaultButton({ handleClick }: ButtonProps) {
  return (
    <>
      <Button onClick={handleClick}>
        <BookmarkFilledIcon width={20} height={20} className="mr-2" />
        <div>책장에 추가된 책입니다.</div>
      </Button>
    </>
  );
}

function AddedButton({ handleClick }: ButtonProps) {
  return (
    <>
      <Button theme="reverse" onClick={handleClick}>
        <BookmarkIcon width={20} height={20} className="mr-2" />
        <div>책장에 추가하기</div>
      </Button>
    </>
  );
}
