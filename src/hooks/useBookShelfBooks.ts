import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/userState";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Book } from "../lib/types";
import { booksState } from "../store/booksState";
import { useEffect } from "react";
import { db } from "../service/firebase";

export default function useBookShelfBooks() {
  const currentUser = useRecoilValue(userState);
  const setBookList = useSetRecoilState(booksState);

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

            setBookList(books);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    getAllBooks();
  }, [currentUser, setBookList]);
}
