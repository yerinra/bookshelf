import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { booksState } from "../store/booksState";
import { collection, onSnapshot } from "firebase/firestore";
import { Book } from "../lib/types";
import { db } from "../service/firebase";

export default function useUpdatedBooks() {
  const currentUser = useRecoilValue(userState);
  const setBookList = useSetRecoilState(booksState);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        if (currentUser) {
          onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
            const mapped = doc?.docs?.map((doc) => doc?.data());
            setBookList(mapped as Book[]);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser) getAllBooks();
  }, [currentUser, setBookList]);
}
