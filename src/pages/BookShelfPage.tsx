import { useEffect, useState } from "react";
import { userState } from "../store/userState";
import { useRecoilValue, useRecoilState } from "recoil";
import { booksState, categorizedBookState } from "../store/booksState";
import Select from "react-select";

import { db } from "../service/firebase";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import MyBook from "../components/MyBook";
import { hashtagsState, selectedTagState } from "../store/hashtagsState";
import { Book, SortOptions } from "../lib/types";
import useBookShelfBooks from "../hooks/useBookShelfBooks";
import Tags from "../components/Tags";
import { toast } from "sonner";
import { ratingState } from "../store/ratingState";

const BookShelfPage = () => {
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const [newHashtag, setNewHashtag] = useState<string | null>("");
  const [allTags, setAllTags] = useRecoilState(hashtagsState);
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const [categorizedBooks, setCategorizedBooks] =
    useRecoilState(categorizedBookState);
  const [sortBy, setSortBy] = useState<SortOptions>("createdAt");
  const [sortedBooks, setSortedBooks] = useState(
    [...(categorizedBooks || [])].sort(
      (x, y) => y.createdAt.seconds - x.createdAt.seconds
    )
  );
  const rating = useRecoilValue(ratingState);

  const options = [
    { value: "createdAt", label: "추가 순" },
    { value: "title", label: "제목 순" },
    { value: "author", label: "작가 순" },
    { value: "rating", label: "별점 순" },
  ];

  useBookShelfBooks();

  useEffect(() => {
    if (categorizedBooks.length == 0) {
      setSelectedTag(null);
    }
  }, [categorizedBooks, setSelectedTag]);

  useEffect(() => {
    const newBooks = [...(categorizedBooks || [])].sort((x, y) => {
      if (sortBy === "createdAt") {
        return x.createdAt.seconds - y.createdAt.seconds;
      }
      if (sortBy === "author") {
        return x.author > y.author ? 1 : x.author < y.author ? -1 : 0;
      }
      if (sortBy === "title") {
        return x.title > y.title ? 1 : x.title < y.title ? -1 : 0;
      }
      if (sortBy === "rating") {
        return x.rating > y.rating ? -1 : x.rating < y.rating ? 1 : 0;
      }
      return 0;
    });
    setSortedBooks(newBooks);
  }, [categorizedBooks, sortBy]);

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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHashtag(e.target.value);
  };

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
        if (bookList.find((v) => v.isbn13 == isbn)!.hashtags.length > 4) {
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

  const updateRating = async (isbn13: string, num: number) => {
    try {
      if (currentUser) {
        const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
        await updateDoc(bookDocRef, { rating: num });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col items-center mt-10 gap-5 w-full">
      <div className="flex justify-between w-4/5 items-center">
        <h1 className="font-bold ml-10 md:ml-36">나의 책장</h1>
        <div className="mr-10 ">
          <Select
            options={options}
            onChange={(option) => {
              if (option) setSortBy(option.value as SortOptions);
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                text: "#000",
                font: "#000",
                primary25: "#ffbb55",
                primary: "#000",
              },
            })}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-2">
        <section>
          <Tags
            allTags={allTags}
            handleSelectTag={handleSelectTag}
            selectedTag={selectedTag}
          />
        </section>
        <main className="flex flex-col items-center md:ml-10">
          {bookList.length == 0 && <>책이 없습니다.</>}
          {sortedBooks.map((book: Book) => (
            <MyBook
              key={book.isbn13}
              book={book}
              handleTagRemove={handleTagRemove}
              handleTagChange={handleTagChange}
              handleAddTag={handleAddTag}
              handleBookRemove={handleBookRemove}
              updateRating={updateRating}
            />
          ))}
        </main>
      </div>
    </section>
  );
};
export default BookShelfPage;
