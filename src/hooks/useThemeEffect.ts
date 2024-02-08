import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../store/themeState";

export default function useThemeEffect() {
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    if (theme) {
      // document.body.dataset.theme = theme;
      document.body.className = theme;
    }
  }, [theme]);
}
