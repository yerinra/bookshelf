import { useEffect } from "react";
import { auth } from "../service/firebase";
import { useSetRecoilState } from "recoil";
import { loginState, userState } from "../store/userState";

const useUser = () => {
  const setLogin = useSetRecoilState(loginState);
  const setCurrentUser = useSetRecoilState(userState);

  useEffect(() => {
    const getCurrentUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setLogin(true);
          setCurrentUser(user.displayName || user.uid);
        } else {
          setLogin(false);
        }
      });
    };

    getCurrentUser();
  }, [setCurrentUser, setLogin]);
};

export default useUser;
