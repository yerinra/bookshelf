import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../store/userState";
import { booksState } from "../store/booksState";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import SkeletonBookDetail from "../components/SkeletonBookDetail";
import { Book, BookInfo } from "../lib/types";

const BookDetailPage = () => {
  const { isbn } = useParams();
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const { isLoading, data } = useBook(isbn);

  const selectedData = data?.map((v) => {
    return {
      author: v.author,
      title: v.title,
      cover: v.cover,
      description: v.description,
      isbn13: v.isbn13,
      pubDate: v.pubDate,
      itemPage: v?.subInfo?.itemPage,
    };
  });

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        if (currentUser) {
          onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
            const mapped = doc?.docs?.map((doc) => doc?.data());
            setBookList(mapped as Book[]);
            if (mapped.filter((v) => v?.isbn13 === isbn).length !== 0) {
              // setAdded(true);
            } else {
              // setAdded(false);
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser && data) getAllBooks();
  }, [currentUser, data, isbn, setBookList]);

  const handleAdd = async (
    isbn13: string,
    title: string,
    author: string,
    cover: string
  ) => {
    try {
      if (currentUser && isbn) {
        await setDoc(doc(db, "users", currentUser, "books", isbn), {
          title: selectedData[0].title,
          author: selectedData[0].author,
          cover: selectedData[0].cover,
          isbn13: isbn,
          hashtags: [],
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
        handleAdd(
          isbn,
          selectedData.title,
          selectedData.author,
          selectedData.author
        );
      }
    }
  };

  return (
    <div className="mt-16 mx-20">
      {isLoading && <SkeletonBookDetail />}
      {selectedData &&
        selectedData.map((data: BookInfo) => (
          <section
            key={data.isbn13}
            className="flex flex-col md:flex-row gap-8"
          >
            <img
              src={data.cover}
              alt="book cover image"
              className="rounded-lg max-w-[240px] mx-auto"
            />
            <div className="flex flex-col gap-3 text-start">
              <div className="font-extrabold text-2xl">{data.title}</div>
              <div className="text-neutral-400">{data.author}</div>
              <div>{data.description}</div>
              <div>총 {data.itemPage}쪽</div>

              {isbn && bookList?.map((v) => v.isbn13).includes(isbn) ? (
                <>
                  <button
                    className="btn btn-reverse max-w-xs mt-3 flex  gap-3 items-center justify-center"
                    onClick={handleClick}
                  >
                    <BookmarkFilledIcon width={20} height={20} />
                    <div>책장에 추가된 책입니다.</div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn max-w-xs mt-3 flex  gap-3 items-center justify-center"
                    onClick={handleClick}
                  >
                    <BookmarkIcon width={20} height={20} />
                    <div>책장에 추가하기</div>
                  </button>
                </>
              )}
            </div>
          </section>
        ))}
    </div>
  );
};

export default BookDetailPage;
