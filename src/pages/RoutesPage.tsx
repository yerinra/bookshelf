import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const BasicLayout = lazy(() => import("../components/templates/BasicLayout"));
const LogInPage = lazy(() => import("./LogInPage"));
const InfoPage = lazy(() => import("./InfoPage"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const SignUpPage = lazy(() => import("./SignUpPage"));
const BookDetailPage = lazy(() => import("./BookDetailPage"));
const BookShelfPage = lazy(() => import("./BookShelfPage"));
const HomePage = lazy(() => import("./HomePage"));
const BookSearchResultPage = lazy(() => import("./BookSearchResultPage"));
const ProtectedRoute = lazy(
  () => import("../components/organisms/ProtectedRoute")
);

const RoutesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default RoutesPage;
