import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/userState";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Book } from "../lib/types";
import { booksState, categorizedBookState } from "../store/booksState";
import { hashtagsState, selectedTagState } from "../store/hashtagsState";
import { useEffect } from "react";
import { db } from "../service/firebase";

export default function useBookShelfBooks() {
  const currentUser = useRecoilValue(userState);
  const setBookList = useSetRecoilState(booksState);

  const setAllTags = useSetRecoilState(hashtagsState);
  const selectedTag = useRecoilValue(selectedTagState);
  const setCategorizedBooks = useSetRecoilState(categorizedBookState);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        if (currentUser) {
          const collectionRef = collection(db, "users", currentUser, "books");
          const q = query(collectionRef, orderBy("createdAt"));
          onSnapshot(q, (doc) => {
            const books: Book[] = [];
            doc?.docs?.forEach((doc) => {
              books.push({ ...doc.data() } as Book);
            });
            console.log("books are", books);
            const hashtags = [...new Set(books.map((v) => v.hashtags).flat())];
            setBookList(books);

            setAllTags(hashtags);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    const getTaggedBooks = async () => {
      try {
        if (currentUser && selectedTag) {
          const taggedBookQuery = query(
            collection(db, "users", currentUser, "books"),
            where("hashtags", "array-contains", selectedTag)
          );
          onSnapshot(taggedBookQuery, (doc) => {
            const books: Book[] = [];
            doc?.docs?.forEach((doc) => {
              books.push({ ...doc.data() } as Book);
            });
            setCategorizedBooks(books);
          });
        } else if (currentUser && !selectedTag) {
          onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
            const books: Book[] = [];
            doc?.docs?.forEach((doc) => {
              books.push({ ...doc.data() } as Book);
            });
            setCategorizedBooks(books);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    getAllBooks();
    getTaggedBooks();
  }, [selectedTag, currentUser, setBookList, setAllTags, setCategorizedBooks]);
}
