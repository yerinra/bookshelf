import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

import useThemeMode from "../hooks/useThemeMode";

export default function DarkModeBtn() {
  const [theme, setTheme] = useThemeMode();

  return (
    <button
      className="bottom-16 right-5 fixed text-2xl rounded-full p-1 hidden sm:block"
      onClick={setTheme}
    >
      {theme == "light" && <IoMdMoon />}
      {theme == "dark" && <MdSunny />}
    </button>
  );
}
