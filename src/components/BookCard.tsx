import { useNavigate } from "react-router-dom";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

import { useRecoilValue } from "recoil";
import { booksState } from "../store/booksState";
import { Book } from "../lib/types";

type BookCardProps = {
  book: Book;
  handleAdd: (
    isbn13: string,
    title: string,
    author: string,
    cover: string
  ) => Promise<void>;
  handleDelete: (isbn13: string) => Promise<void>;
};

export default function BookCard({
  book,
  handleAdd,
  handleDelete,
}: BookCardProps) {
  const navigate = useNavigate();
  const bookList = useRecoilValue(booksState);

  const handleBookClick = () => {
    navigate(`/book/${isbn13}`);
  };

  const handleBookMarkClick = async () => {
    if (bookList?.map((v) => v.isbn13).includes(isbn13)) {
      handleDelete(isbn13);
    } else {
      handleAdd(isbn13, title, author, cover);
    }
  };

  const { title, author, cover, isbn13 } = book;

  return (
    <div className="flex gap-5 items-start text-start mx-10 mb-4 border border-1 border-l-border dark:border-d-border px-7 py-5 rounded-lg relative min-h-[12rem] max-w-[56rem]">
      <img
        onClick={handleBookClick}
        src={cover}
        className="rounded-lg cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <div
          className="font-semibold text-md cursor-pointer"
          onClick={handleBookClick}
        >
          {title}
        </div>
        <div className="text-xs text-l-text-secondary">
          {author.length > 30 ? author.slice(0, 30) + " ..." : author}
        </div>
        <button className="mt-3" onClick={handleBookMarkClick}>
          {bookList && bookList?.map((v) => v.isbn13).includes(isbn13) ? (
            <BookmarkFilledIcon width="20" height="20" />
          ) : (
            <BookmarkIcon width="20" height="20" />
          )}
        </button>
      </div>
    </div>
  );
}
