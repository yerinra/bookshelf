import { SunIcon } from "@radix-ui/react-icons";
import { MoonIcon } from "@radix-ui/react-icons";

import useThemeMode from "../hooks/useThemeMode";

export default function DarkModeBtn() {
  const [theme, setTheme] = useThemeMode();

  return (
    <button
      className="bottom-16 right-5 fixed rounded-full p-1 hidden sm:block"
      onClick={setTheme}
    >
      {theme == "light" && <MoonIcon width="20" height="20" />}
      {theme == "dark" && <SunIcon width="20" height="20" />}
    </button>
  );
}
