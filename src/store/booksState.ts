import { atom } from "recoil";
import { Book } from "../lib/types";

export const booksState = atom<Book[]>({
  key: "booksState",
  default: [],
});
