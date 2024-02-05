import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Book } from "../lib/types";
import { booksState, categorizedBookState } from "../store/booksState";
import { hashtagsState, selectedTagState } from "../store/hashtagsState";
import { useEffect, useState } from "react";
import { db } from "../service/firebase";

export default function useBookShelfBooks() {
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const [allTags, setAllTags] = useRecoilState(hashtagsState);
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const [categorizedBooks, setCategorizedBooks] =
    useRecoilState(categorizedBookState);

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
            console.log(books);
            const hashtags = [...new Set(books.map((v) => v.hashtags).flat())];
            setBookList(books);

            setAllTags(hashtags);
          });
        }

        // collection(db, "users", currentUser, "books")
        // const q = query(
        //   collectionRef,

        //   orderBy("createdAt", "asc")
        // );
        // console.log(bookList);
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
    // console.log(bookList);
  }, [selectedTag, currentUser]);
}
