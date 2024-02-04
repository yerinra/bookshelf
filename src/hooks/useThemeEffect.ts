import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { themeState } from "../store/themeState";

export default function useThemeEffect() {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme;
    }
    console.log("현재 theme", theme);
  }, [theme]);
}
