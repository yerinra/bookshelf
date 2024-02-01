import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { useRecoilState } from "recoil";
import { themeState } from "../store/themeState";
import { useEffect } from "react";

export default function DarkModeBtn() {
  const [theme, setTheme] = useRecoilState(themeState);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="bottom-16 right-5 fixed text-2xl rounded-full p-1 hidden sm:block bg-base-100"
      onClick={() => {
        if (theme == "emerald") {
          setTheme("dracula");
          localStorage.setItem("theme", "dracula");
        } else {
          setTheme("emerald");
          localStorage.setItem("theme", "emerald");
        }
      }}
    >
      {theme == "emerald" && <MdSunny />}
      {theme == "dracula" && <IoMdMoon />}
    </button>
  );
}
