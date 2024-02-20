import { atom } from "recoil";

export const ratingState = atom<number>({
  key: "ratingState",
  default: 0,
});
