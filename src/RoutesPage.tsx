import { Routes, Route } from "react-router-dom";

import BasicLayout from "./components/BasicLayout";
import LogInPage from "./pages/LogInPage";
import InfoPage from "./pages/InfoPage";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import BookDetailPage from "./pages/BookDetailPage";
import BookShelfPage from "./pages/BookShelfPage";
import HomePage from "./pages/HomePage";
import BookSearchResultPage from "./pages/BookSearchResultPage";

const RoutesPage = () => {
  return (
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
  );
};

export default RoutesPage;
