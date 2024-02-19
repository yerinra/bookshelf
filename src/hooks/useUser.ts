import { useEffect } from "react";
import { auth } from "../service/firebase";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userState";

const useUser = () => {
  const setCurrentUser = useSetRecoilState(userState);

  useEffect(() => {
    const getCurrentUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user.displayName || user.uid);
        }
      });
    };

    getCurrentUser();
  }, [setCurrentUser]);
};

export default useUser;
