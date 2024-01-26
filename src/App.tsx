import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import BasicLayout from "./components/BasicLayout";
import LogInPage from "./pages/LogInPage";
import InfoPage from "./pages/InfoPage";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import BookDetailPage from "./pages/BookDetailPage";
import BookShelfPage from "./pages/BookShelfPage";

import { useRecoilState } from "recoil";
import { loginState, userState } from "../src/store/userState";
import { useEffect } from "react";
import { auth } from "./service/firebase";
import HomePage from "./pages/HomePage";
import BookSearchResultPage from "./pages/BookSearchResultPage";

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const queryClient = new QueryClient();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
        setUser(user?.uid);
      } else {
        setLogin(false);
      }
      console.log("appp", user?.uid);
    });
  }, [login, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<BasicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/bookshelf" element={<BookShelfPage />} />
            <Route path="/books/:keyword" element={<BookSearchResultPage />} />
            <Route path="/book/:isbn" element={<BookDetailPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
