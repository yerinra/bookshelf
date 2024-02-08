import { Timestamp } from "firebase/firestore";

export type Theme = "light" | "dark";

export type HashTags = string[];

export type Book = {
  author: string;
  cover: string;
  hashtags: HashTags;
  isbn13: string;
  itemPage: number;
  title: string;
  createdAt: Timestamp;
};
