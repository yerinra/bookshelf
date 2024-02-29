import React from "react";
import { BookInfo } from "../../../lib/types";
import { AddedButton, DefaultButton } from "./BookAddButton";
import BookCoverImg from "./BookCoverImg";

type BookMetaDataProps = {
  book: BookInfo;
  added: boolean;
  handleClick: () => void;
};

const BookMetaData = React.memo(
  ({ book, added, handleClick }: BookMetaDataProps) => {
    return (
      <section className="flex flex-col md:flex-row">
        <BookCoverImg bookCover={book.cover} />

        <section className="flex flex-col gap-3 md:ml-8 text-start mb-28">
          <p className="font-extrabold text-2xl">{book.title}</p>
          <p className="text-neutral-400">{book.author}</p>
          <p>{book.description}</p>
          {/* <p>총 {book.itemPage}쪽</p> */}
          <div className="md:max-w-[320px]">
            {!added && <AddedButton handleClick={handleClick} />}
            {!!added && <DefaultButton handleClick={handleClick} />}
          </div>
        </section>
      </section>
    );
  }
);

export default BookMetaData;
