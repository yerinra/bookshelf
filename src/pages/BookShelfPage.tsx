import React, { useState, useMemo, Suspense } from "react";
import { userState } from "../store/userState";
import { useRecoilValue } from "recoil";
import { booksState } from "../store/booksState";
import Select from "react-select";

import { db } from "../service/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

import { Book, HashTags, SortOptions } from "../lib/types";
import useBookShelfBooks from "../hooks/useBookShelfBooks";
import Tags from "../components/molecules/BookShelf/Tags";
import { toast } from "sonner";
import useSort from "../hooks/useSort";
// import BookShelfCard from "../components/organisms/BookShelfCard";
import { OPTIONS } from "../lib/constants";
import { SEOMetaTags } from "../components/molecules/SEOMetaTags";
import Spinner from "../components/molecules/Spinner";

const BookShelfCard = React.lazy(
  () => import("../components/organisms/BookShelfCard")
);

const BookShelfPage = () => {
  const currentUser = useRecoilValue(userState);
  const bookList = useRecoilValue(booksState);
  const allTags = useMemo(() => {
    const tags: HashTags = [];
    bookList.forEach((book) => {
      if (book.hashtags) tags.push(...book.hashtags);
    });

    return [...new Set(tags)];
  }, [bookList]);

  const [newHashtag, setNewHashtag] = useState<string | null>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useBookShelfBooks();

  const { sortedBooks, setSortBy } = useSort();
  const sortedAndTaggedBooks = useMemo(
    () =>
      sortedBooks.filter((book) => book.hashtags?.includes(selectedTag!))
        .length == 0
        ? sortedBooks
        : sortedBooks.filter((book) => book.hashtags?.includes(selectedTag!)),
    [selectedTag, sortedBooks]
  );

  const handleAddTag = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    isbn: string
  ) => {
    try {
      if (
        currentUser &&
        e.key === "Enter" &&
        e.currentTarget.value.trim() !== ""
      ) {
        if (bookList.find((v) => v.isbn13 == isbn)!.hashtags!.length > 4) {
          return;
        }
        if ((e.target as HTMLInputElement).value.trim().length > 10) {
          toast.error("태그는 열 글자 이내로 입력해주세요.");
          return;
        }
        const bookDocRef = doc(db, "users", currentUser, "books", isbn);
        await updateDoc(bookDocRef, { hashtags: arrayUnion(newHashtag) });
        (e.target as HTMLInputElement).value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHashtag(e.target.value);
  };

  const handleTagRemove = async (tagName: string, isbn13: string) => {
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser, "books", isbn13), {
          hashtags: arrayRemove(tagName),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectTag = (tagName: string) => {
    if (selectedTag == tagName) {
      setSelectedTag(null);
    } else setSelectedTag(tagName);
  };

  const handleBookRemove = async (isbn13: string) => {
    try {
      if (currentUser) {
        const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
        await deleteDoc(bookDocRef);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateRating = async (isbn13: string, ratingCount: number) => {
    try {
      if (currentUser) {
        const arr: Book[] = [];
        const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
        const querySnapshot = await getDocs(
          collection(db, "users", currentUser, "books")
        );
        querySnapshot.forEach((doc) => {
          arr.push(doc.data() as Book);
        });

        if (arr.find((v) => v.isbn13 == isbn13))
          await updateDoc(bookDocRef, { rating: ratingCount });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <SEOMetaTags
        title={`${currentUser}의 책장 - BOOK:SHELF`}
        desc={`${currentUser}의 책장입니다.`}
      />
      <section className="flex flex-col justify-center items-center mt-6 gap-5 w-[800px]">
        <h1 className="font-bold text-xl">나의 책장 📖</h1>
        <div className="flex w-full ml-20">
          <Select
            options={OPTIONS}
            onChange={(option) => {
              if (option) setSortBy(option.value as SortOptions);
            }}
            className="my-react-select-container"
            classNamePrefix="my-react-select"
          />
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-2 w-full">
          <Tags
            allTags={allTags}
            handleSelectTag={handleSelectTag}
            selectedTag={selectedTag}
          />

          <main className="flex flex-col items-center h-[450px] mx-5 border border-l-border dark:border-d-border rounded-lg overflow-y-auto w-full">
            {bookList.length == 0 && <>책이 없습니다.</>}
            {sortedBooks.length > 0 &&
              sortedAndTaggedBooks.map((book: Book) => (
                <Suspense key={book.isbn13} fallback={<Spinner />}>
                  <BookShelfCard
                    key={book.isbn13}
                    book={book}
                    handleTagRemove={handleTagRemove}
                    handleTagChange={handleTagChange}
                    handleAddTag={handleAddTag}
                    handleBookRemove={handleBookRemove}
                    updateRating={updateRating}
                  />
                </Suspense>
              ))}
          </main>
        </div>
      </section>
    </>
  );
};
export default BookShelfPage;
