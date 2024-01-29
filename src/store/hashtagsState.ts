import { atom } from "recoil";

export const hashtagsState = atom<[]>({
  key: "hashtagsState",
  default: [],
});
