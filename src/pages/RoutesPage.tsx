import { Routes, Route } from "react-router-dom";

import BasicLayout from "../components/BasicLayout";
import LogInPage from "./LogInPage";
import InfoPage from "./InfoPage";
import ErrorPage from "./ErrorPage";
import SignUpPage from "./SignUpPage";
import BookDetailPage from "./BookDetailPage";
import BookShelfPage from "./BookShelfPage";
import HomePage from "./HomePage";
import BookSearchResultPage from "./BookSearchResultPage";
import ProtectedRoute from "../components/ProtectedRoute";

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<BasicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route
          path="/bookshelf"
          element={
            <ProtectedRoute>
              <BookShelfPage />
            </ProtectedRoute>
          }
        />
        <Route path="/books/:keyword" element={<BookSearchResultPage />} />
        <Route path="/book/:isbn" element={<BookDetailPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesPage;
