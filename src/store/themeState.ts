import { atom } from "recoil";
import { Theme } from "../lib/types";

let defaultTheme: Theme = "light";

const savedTheme = window.localStorage.getItem("theme");

if (savedTheme) {
  defaultTheme = savedTheme as Theme;
} else {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  defaultTheme = isDarkMode ? "dark" : "light";
}

export const themeState = atom({
  key: "themeState",
  default: defaultTheme,
});
