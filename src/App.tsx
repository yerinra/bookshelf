import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import RoutesPage from "./RoutesPage";

import { useRecoilState } from "recoil";
import { loginState, userState } from "../src/store/userState";
import { useEffect } from "react";
import { auth, db } from "./service/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { booksState } from "./store/booksState";

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  // const [allTags, setAllTags] = useRecoilState(tagsState);

  const queryClient = new QueryClient();

  useEffect(() => {
    const getCurrentUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setLogin(true);
          setCurrentUser(user?.uid);
        } else {
          setLogin(false);
        }
      });
    };
    getCurrentUser();
  }, [login]);

  useEffect(() => {
    const getBookList = async () => {
      if (currentUser) {
        try {
          onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
            const mapped = doc?.docs?.map((doc) => doc?.data());
            setBookList(mapped);
          });
        } catch (e) {
          console.error(e);
        }
      }
    };
    getBookList();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RoutesPage />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
