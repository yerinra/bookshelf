import { atom } from "recoil";

export const loginState = atom<boolean>({
  key: "logInState",
  default: false,
});

export const userState = atom<string | null>({
  key: "userState",
  default: null,
});
