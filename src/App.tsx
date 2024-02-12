import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RoutesPage from "./RoutesPage";
// import useThemeEffect from "./hooks/useThemeEffect";
import useThemeMode from "./hooks/useThemeMode";
import useUser from "./hooks/useUser";

function App() {
  const queryClient = new QueryClient();
  useThemeMode();
  useUser();

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
