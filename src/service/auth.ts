import { FirebaseError } from "firebase/app";
import { auth, googleProvider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "sonner";

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    toast.success(`${res.user?.displayName || res.user?.uid}님 환영합니다.`);
    return res.user;
  } catch (err: unknown) {
    let message;
    if (err instanceof FirebaseError) {
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
      toast.error(message);
    }
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`${res.user?.displayName || res.user?.uid}님 반갑습니다.`);
    return res;
  } catch (err: unknown) {
    let message;
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential":
          message = "입력된 정보가 올바르지 않습니다.";
          break;
        case "auth/invalid-password":
          message = "비밀번호가 틀렸습니다.";
          break;
        default:
          message = "로그인에 실패 하였습니다.";
      }
      toast.error(message);
    }
  }
};

export const signInWithGoogle = async () => {
  googleProvider.setCustomParameters({ prompt: "select_account" });
  try {
    const res = await signInWithPopup(auth, googleProvider);
    toast.success(`${res?.user?.displayName || res?.user?.uid}님 반갑습니다.`);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
