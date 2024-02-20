import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export type Theme = "light" | "dark";

export type HashTags = string[];

export type Book = {
  author: string;
  cover: string;
  hashtags?: HashTags;
  isbn13: string;
  itemPage: number;
  title: string;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  createdAt: Timestamp;
};

export type BookInfo = {
  author: string;
  title: string;
  cover: string;
  description: string;
  isbn13: string;
  pubDate: Date;
  itemPage: number;
};

export type SortOptions = "createdAt" | "title" | "author" | "rating";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "비밀번호는 최소한 8글자여야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "입력한 비밀번호와 다릅니다.",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
