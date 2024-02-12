import { useRecoilState } from "recoil";
import { themeState } from "../store/themeState";
import { Theme } from "../lib/types";
import { useEffect } from "react";

const useThemeMode = () => {
  const [theme, setTheme] = useRecoilState<Theme>(themeState);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null;

    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") {
        document.body.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.body.classList.add("dark");
    }
  }, []);

  return [theme, toggleTheme] as const;
};

export default useThemeMode;
