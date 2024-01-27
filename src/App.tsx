import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import RoutesPage from "./RoutesPage";

import { useRecoilState } from "recoil";
import { loginState, userState } from "../src/store/userState";
import { useEffect } from "react";
import { auth } from "./service/firebase";

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
        <RoutesPage />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
