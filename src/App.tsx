import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RoutesPage from "./pages/RoutesPage";
import useThemeMode from "./hooks/useThemeMode";
import useUser from "./hooks/useUser";
import { Toaster } from "sonner";
import { Helmet } from "react-helmet-async";

function App() {
  const queryClient = new QueryClient();

  useThemeMode();
  useUser();

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <title>BOOKSHELF: 나의 온라인 책장</title>
      </Helmet>
      <Router>
        <RoutesPage />
        <Toaster position="top-center" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
