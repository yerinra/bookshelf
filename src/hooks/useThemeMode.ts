import { useRecoilState } from "recoil";
import { themeState } from "../store/themeState";
import { Theme } from "../lib/types";

const useThemeMode = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  return [theme, toggleTheme];
};

export default useThemeMode;
