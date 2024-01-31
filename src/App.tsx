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
// import { onAuthStateChanged } from "firebase/auth";
import { themeState } from "./store/themeState";

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const [theme, setTheme] = useRecoilState(themeState);

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
  }, []);

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

  useEffect(() => {
    if (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorage.getItem("theme") == "dracula"
    ) {
      document.documentElement.setAttribute("data-theme", "dracula");
      setTheme("dracula");
    } else {
      document.documentElement.setAttribute("data-theme", "emerald");
      localStorage.setItem("theme", "emerald");
      setTheme("emerald");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RoutesPage />
      </Router>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
