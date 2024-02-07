import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RoutesPage from "./RoutesPage";
import useThemeEffect from "./hooks/useThemeEffect";
import useUser from "./hooks/useUser";

function App() {
  const queryClient = new QueryClient();
  useThemeEffect();
  useUser();

  // useEffect(() => {
  //   const getBookList = async () => {
  //     if (currentUser) {
  //       try {
  //         onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
  //           const mapped = doc?.docs?.map((doc) => doc?.data());
  //           setBookList(mapped);
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //   };
  //   getBookList();
  // }, []);

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
