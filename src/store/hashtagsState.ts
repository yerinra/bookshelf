import { atom } from "recoil";
import { HashTags } from "../lib/types";

export const hashtagsState = atom<HashTags>({
  key: "hashtagsState",
  default: [],
});

export const selectedTagState = atom<string | null>({
  key: "selectedTagState",
  default: null,
});
