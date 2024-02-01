import { auth, googleProvider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    alert(`환영합니다. ${email.split("@")[0]}님`);
    return res.user;
  } catch (err) {
    let message;
    switch (err.code) {
      case "auth/user-not-found":
        message = "이메일에 해당하는 유저가 존재하지 않습니다.";
        break;
      // case "auth/wrong-password":
      case "auth/email-already-in-use":
        message = "이미 사용 중인 이메일입니다.";
        break;
      case "auth/weak-password":
        message = "비밀번호는 6글자 이상이어야 합니다.";
        break;
      case "auth/network-request-failed":
        message = "네트워크 연결에 실패 하였습니다.";
        break;
      case "auth/invalid-email":
        message = "잘못된 이메일 형식입니다.";
        break;
      case "auth/internal-error":
        message = "잘못된 요청입니다.";
        break;
      default:
        message = "로그인에 실패 하였습니다.";
    }
    alert(message);
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    let message;
    console.error(err);
    switch (err.code) {
      case "auth/invalid-credential":
        message = "입력된 정보가 틀렸습니다.";
        break;
      case "auth/invalid-password":
        message = "비밀번호가 틀렸습니다.";
        break;
      default:
        message = "로그인에 실패 하였습니다.";
    }
    alert(message);
  }
};

export const signInWithGoogle = async () => {
  googleProvider.setCustomParameters({ prompt: "select_account" });
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  await signOut(auth);
};
