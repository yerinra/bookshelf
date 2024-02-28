import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { booksState } from "../../store/booksState";
import { Book } from "../../lib/types";
import BookMarkBtn from "../molecules/BookSearchResult/BookMarkBtn";
import TitleAndAuthorInfo from "../molecules/TitleAndAuthorInfo";
import BookSearchResultImg from "../molecules/BookSearchResult/BookSearchResultImg";

type BookSearchResultCardProps = {
  book: Book;
  handleAdd: (
    isbn13: string,
    title: string,
    author: string,
    cover: string
  ) => Promise<void>;
  handleDelete: (isbn13: string) => Promise<void>;
};

export default function BookSearchResultCard({
  book,
  handleAdd,
  handleDelete,
}: BookSearchResultCardProps) {
  const navigate = useNavigate();
  const bookList = useRecoilValue(booksState);
  const { title, author, cover, isbn13 } = book;

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

  return (
    <section className="flex gap-5 items-start text-start mx-10 mb-4 border border-1 border-l-border dark:border-d-border px-7 py-5 rounded-lg relative min-h-[12rem] max-w-[56rem]">
      <BookSearchResultImg cover={cover} onClick={handleBookClick} />
      <section className="flex flex-col gap-2">
        <TitleAndAuthorInfo onClick={handleBookClick} book={book} />
        <BookMarkBtn
          onClick={handleBookMarkClick}
          added={bookList && bookList?.map((v) => v.isbn13).includes(isbn13)}
        />
      </section>
    </section>
  );
}
