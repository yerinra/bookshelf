import { useEffect, useState, useCallback } from "react";
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
} from "firebase/firestore";

const BookShelfPage: React.FC = () => {
  const currentUser = useRecoilValue(userState);
  const login = useRecoilValue(loginState);
  const navigate = useNavigate();

  const [bookList, setBookList] = useRecoilState(booksState);
  const [newHashtag, setNewHashtag] = useState("");
  const [allTags, setAllTags] = useRecoilState(hashtagsState);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [categorizedBooks, setCategorizedBooks] = useState([]);

  const booksCollectionRef = collection(db, "users", currentUser, "books");
  const handleBookRemove = async (isbn13) => {
    const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
    await deleteDoc(bookDocRef);
  };

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        onSnapshot(booksCollectionRef, (doc) => {
          const mapped = doc?.docs?.map((doc) => doc?.data());
          const hashtags = [...new Set(mapped.map((v) => v.hashtags).flat())];
          setBookList(mapped);
          setAllTags(hashtags);
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser) getAllBooks();
  }, [currentUser]);

  const handleTagRemove = async (tagName, isbn13) => {
    const bookDocRef = doc(db, "users", currentUser, "books", isbn13);
    await updateDoc(bookDocRef, {
      hashtags: arrayRemove(tagName),
    });
  };

  const handleTagChange = (e) => {
    setNewHashtag(e.target.value);
  };

  const handleAddTag = async (e, isbn: string) => {
    try {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
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
      console.log("이미 눌렸음");
      setSelectedTag(null);
    } else setSelectedTag(tag);
  };

  // protected route
  useEffect(() => {
    if (!currentUser || !login) navigate("/");
  }, []);

  useEffect(() => {
    console.log(selectedTag);
    setCategorizedBooks(
      bookList.filter((book) => book.hashtags.includes(selectedTag))
    );
    console.log(bookList);
  }, [selectedTag]);

  return (
    <section className="flex flex-col gap-10 items-center">
      <h1 className="mt-14 font-bold">{currentUser} 님의 책장</h1>
      <div className="flex flex-col gap-2">
        <h2 className="">나의 태그</h2>
        <div className="flex gap-1">
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
      <main>
        {selectedTag &&
          categorizedBooks.map((book) => (
            <div key={`${book.isbn13}-${book.title}`}>
              <ul>
                <li>{book.title}</li>
                <li>{book.author}</li>
                <li>
                  {book.hashtags &&
                    book.hashtags?.map((tag, i) => (
                      <button className="btn btn-xs btn-outline" key={i}>
                        <div className="tagName">{tag}</div>
                        <div
                          onClick={() => {
                            handleTagRemove(tag, book.isbn13);
                          }}
                        >
                          x
                        </div>
                      </button>
                    ))}
                </li>
              </ul>

              <input
                className="HashInput"
                type="text"
                onChange={(e) => handleTagChange(e)}
                onKeyUp={(e) => handleAddTag(e, book.isbn13)}
                placeholder="해시태그를 입력하세요"
              />
              <button
                className="btn"
                onClick={() => handleBookRemove(book.isbn13)}
              >
                Delete
              </button>
            </div>
          ))}
        {!selectedTag &&
          bookList &&
          bookList.map((book) => (
            <div key={`${book.isbn13}-${book.title}`}>
              <ul>
                <li>{book.title}</li>
                <li>{book.author}</li>
                <li>
                  {book.hashtags &&
                    book.hashtags?.map((tag, i) => (
                      <button className="btn btn-xs btn-outline" key={i}>
                        <div className="tagName">{tag}</div>
                        <div
                          onClick={() => {
                            handleTagRemove(tag, book.isbn13);
                          }}
                        >
                          x
                        </div>
                      </button>
                    ))}
                </li>
              </ul>

              <input
                className="HashInput"
                type="text"
                onChange={(e) => handleTagChange(e)}
                onKeyUp={(e) => handleAddTag(e, book.isbn13)}
                placeholder="해시태그를 입력하세요"
              />
              <button
                className="btn"
                onClick={() => handleBookRemove(book.isbn13)}
              >
                Delete
              </button>
            </div>
          ))}
      </main>
    </section>
  );
};
export default BookShelfPage;
