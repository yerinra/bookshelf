import { useEffect, useState } from "react";
import { userState, loginState } from "../store/userState";
import { useRecoilValue, useRecoilState } from "recoil";
import { booksState } from "../store/booksState";
import { hashtagsState } from "../store/hashtagsState";
import { useNavigate } from "react-router-dom";

import { db } from "../service/firebase";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import MyBook from "../components/MyBook";

const BookShelfPage = () => {
  const currentUser = useRecoilValue(userState);
  const login = useRecoilValue(loginState);
  const navigate = useNavigate();

  const [bookList, setBookList] = useRecoilState(booksState);
  const [newHashtag, setNewHashtag] = useState<string | null>("");
  const [allTags, setAllTags] = useRecoilState(hashtagsState);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [categorizedBooks, setCategorizedBooks] = useState([]);
  const [tempTags, setTempTags] = useState([]);

  const handleBookRemove = async (isbn13) => {
    const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
    await deleteDoc(bookDocRef);
  };

  const getTaggedBooks = async () => {
    try {
      const taggedBookQuery = query(
        collection(db, "users", currentUser, "books"),
        where("hashtags", "array-contains", selectedTag)
      );
      const querySnapshot = await getDocs(taggedBookQuery);

      setCategorizedBooks(querySnapshot.docs.map((doc) => doc.data()));
      console.log(selectedTag);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
          const mapped = doc?.docs?.map((doc) => doc?.data());
          const hashtags = [...new Set(mapped.map((v) => v.hashtags).flat())];
          setBookList(mapped);
          setAllTags(hashtags);

          if (currentUser && selectedTag) getTaggedBooks();
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser) getAllBooks();
    // console.log(currentUser);
  }, [currentUser, selectedTag]);

  useEffect(() => {
    if (categorizedBooks.length == 0) {
      setSelectedTag(null);
    }
  }, [categorizedBooks]);
  const handleTagRemove = async (tagName, isbn13) => {
    try {
      const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
      await updateDoc(doc(db, "users", currentUser, "books", isbn13), {
        hashtags: arrayRemove(tagName),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleTagChange = (e) => {
    setNewHashtag(e.target.value);
  };

  const handleAddTag = async (e, isbn: string) => {
    try {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
        // 10개까지만 가능.
        // console.log(bookList.find((v) => v.isbn13 == isbn));
        if (bookList.find((v) => v.isbn13 == isbn).hashtags.length > 4) {
          return;
        }
        if (e.target.value.trim().length > 10) {
          alert("태그는 열 글자 이내로 입력해주세요.");
          return;
        }
        const bookDocRef = doc(db, "users", currentUser, "books", isbn);
        await updateDoc(bookDocRef, { hashtags: arrayUnion(newHashtag) });
        // console.log("update", newHashtag);
        e.target.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectTag = (tag) => {
    if (selectedTag == tag) {
      // console.log("이미 눌렸음");
      setSelectedTag(null);
    } else setSelectedTag(tag);
  };

  // protected route
  // useEffect(() => {
  //   if (!currentUser || !login) navigate("/");
  // }, []);

  // ❌
  // useEffect(() => {
  //   const getTaggedBooks = async () => {
  //     try {
  //       const taggedBookQuery = query(
  //         collection(db, "users", currentUser, "books"),
  //         where("hashtags", "array-contains", selectedTag)
  //       );
  //       const querySnapshot = await getDocs(taggedBookQuery);

  //       setCategorizedBooks(querySnapshot.docs.map((doc) => doc.data()));
  //       console.log(selectedTag);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   if (currentUser && selectedTag) getTaggedBooks();
  // }, [selectedTag]);

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col w-full">
        <h1 className="mt-14 font-bold text-start pl-10">
          {currentUser} 님의 책장
        </h1>
        <div className="flex flex-col gap-5 mt-5 mb-3 py-5 w-full bg-neutral-50 p-10 rounded-lg">
          <h2 className="font-bold text-start ml-2">나의 태그</h2>
          <div className="flex gap-2 flex-wrap">
            {allTags &&
              allTags.map((tag, i) => (
                <button
                  className={`btn btn-xs ${
                    selectedTag && selectedTag == tag && "btn-primary"
                  }`}
                  key={`${tag}-${i}`}
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      </div>
      <main className="max-w-4/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bookList.length == 0 && <>책이 없습니다.</>}

        {selectedTag &&
          categorizedBooks.map((book) => (
            <MyBook
              key={book.isbn13}
              book={book}
              handleTagRemove={handleTagRemove}
              handleTagChange={handleTagChange}
              handleAddTag={handleAddTag}
              handleBookRemove={handleBookRemove}
            />
          ))}
        {!selectedTag &&
          bookList &&
          bookList.map((book) => (
            <MyBook
              key={book.isbn13}
              book={book}
              handleTagRemove={handleTagRemove}
              handleTagChange={handleTagChange}
              handleAddTag={handleAddTag}
              handleBookRemove={handleBookRemove}
            />
          ))}
      </main>
    </section>
  );
};
export default BookShelfPage;
